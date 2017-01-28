'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const configStore = require('configstore');
const globalShortcut = require('electron-shortcut');
const togglify = require('electron-togglify-window');
const windowStateKeeper = require('electron-window-state');
const pkg = require('./package.json');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const conf = new configStore(pkg.name, {animation: 'scale'});

if (process.env.NODE_ENV !== 'production') {
	const crashReporter = electron.crashReporter;
	crashReporter.start({
		companyName: pkg.author.name,
		submitURL: pkg.repository
	});
	require('electron-debug')();
}

require('electron-menu-loader')('./menu');

// prevent window being GC'd
let window = null;

app.on('window-all-closed', () => {
	app.quit();
});

app.on('ready', () => {

	const mainWindowState = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 600
	});

	window = new BrowserWindow({
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		resizable: true,
		center: true,
		show: true,
		skipTaskbar: true,
		webPreferences: {
			preload: path.join(__dirname, 'browser.js')
		}
	});

	mainWindowState.manage(window);

	window.loadURL('http://devdocs.io');

	window.on('closed', () => {
		// deref the window, for multiple windows store them in an array
		window = null;
	});

	window.webContents.on('new-window', (e, url) => {
		shell.openExternal(url);
		e.preventDefault();
	});

	const page = window.webContents;

	page.on('dom-ready', () => {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		window.show();
	});

	// TODO make this shortcut configurable
	globalShortcut.register('Cmd+Shift+Space', {
		autoRegister: false,
		cmdOrCtrl: false
	}, () => {

		if (window.isVisible() && window.isFocused()) {
			app.hide();
		} else {
			app.focus();
		}

	});
});

app.on('browser-window-blur', () => {
	app.hide();
});

app.on('menuitem-click', e => {
	if (e.event === 'toggle-animation') {
		const animation = conf.get('animation') === 'hide' ? 'scale' : 'hide';
		conf.set('animation', animation);
		togglify.changeAnimation(window, animation);
	} else {
		BrowserWindow.getFocusedWindow().webContents.send(e.event);
	}
});

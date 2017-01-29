'use strict';

const {app} = require('electron');

module.exports = [
	{
		label: app.getName(),
		submenu: [
			{
				label: 'About Devdocs',
				click() {
					app.emit('menuitem-click', {
						event: 'about'
					});
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Toggle',
				accelerator: 'Cmd+Shift+Space'
			},
			{
				type: 'separator'
			},
			{
				label: 'Toggle theme',
				accelerator: 'Cmd+Shift+H',
				click() {
					app.emit('menuitem-click', {
						event: 'theme'
					});
				}
			},
			{
				label: 'Offline',
				accelerator: 'Cmd+Shift+O',
				click() {
					app.emit('menuitem-click', {
						event: 'offline'
					});
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Hide',
				role: 'hide'
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				accelerator: 'Cmd+Q',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				role: 'undo'
			},
			{
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				role: 'cut'
			},
			{
				role: 'copy'
			},
			{
				role: 'paste'
			},
			{
				role: 'pasteandmatchstyle'
			},
			{
				role: 'delete'
			},
			{
				role: 'selectall'
			}
		]
	},
	{
		label: 'Help',
		submenu: [{
			label: 'News',
			click() {
				app.emit('menuitem-click', {
					event: 'news'
				});
			}
		}, {
			label: 'Tips',
			click() {
				app.emit('menuitem-click', {
					event: 'tips'
				});
			}
		}]
	}
];

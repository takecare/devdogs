'use strict';

const {app} = require('electron');

const appName = app.getName();

module.exports = {
    darwin: {
        label: appName,
        submenu: [
            {
                label: 'About Devdocs',
                event: 'about'
            },
            {
                type: 'separator'
            },
            {
                label: 'Toggle theme',
                accelerator: 'Cmd+Shift+H',
                event: 'theme'
            },
            {
                label: 'Offline',
                accelerator: 'Cmd+Shift+O',
                event: 'offline'
            },
            {
                type: 'separator'
            },
            {
                label: 'Hide',
                accelerator: 'Esc',
                selector: 'hide:'
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
    edit: {
        label: 'Edit',
        submenu: [{
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    },
    help: {
        label: 'Help',
        submenu: [{
            label: 'News',
            event: 'news'
        }, {
            label: 'Tips',
            event: 'tips'
        }]
    }
};

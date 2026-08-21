// Launches Electron directly (bypassing electron's own cli.js), after stripping
// ELECTRON_RUN_AS_NODE from the environment. That variable is set by VS Code's
// integrated terminal (VS Code itself is an Electron app) and, if inherited,
// makes electron.exe launch as plain Node instead of the Electron runtime -
// breaking any access to Electron main-process APIs (Menu, app, BrowserWindow, ...).
// `cross-env VAR=` only sets an empty value, which Electron still treats as "set",
// so unsetting has to happen here in Node before spawning the child process.

const { spawn } = require('child_process')
const electronPath = require('electron')

const env = { ...process.env }
delete env.ELECTRON_RUN_AS_NODE

const child = spawn(electronPath, process.argv.slice(2), { stdio: 'inherit', env })
child.on('close', (code) => process.exit(code ?? 1))

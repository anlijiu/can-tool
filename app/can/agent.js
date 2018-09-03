// const { Agent, IntelligenceAgency } = require('bindings')('can')
import { entries } from '../utils/object'
import can from 'node-can'
const {ipcMain} = require('electron')

export default class Agent {
  constructor() {
    this._instance = new can.Agent()
    this.registerRendererEvents()
  }

  get weapons() {
    return this._instance.supportWeapons;
  }

  set weapon(weapon) {
    this._instance.weapon = weapon;
  }

  fire() {
    this._instance.fire()
  }

  ceaseFire() {
    this._instance.ceaseFire()
  }

  registerRendererEvents() {
    ipcMain.on('action:acquire:received', (event, arg) => {
      const m  = this._instance.acquireReceivedMessage();
      event.sender.send('replay:acquire:received', m)
    })


    ipcMain.on('update-message-defs', (event, arg) => {
      console.log("agent.js receive update-message-defs start  ")
      this._instance.ammoMetas = arg
      event.sender.send('update-message-defs', 'done')
      console.log("agent.js receive update-message-defs end !!!! ")
    })
    ipcMain.on('action:sync:meta', (event, messages, signals, strategies) => {
      if(!messages || !signals || !strategies) {
        event.returnValue = 'error'
        return
      }
      console.log("agent.js receive action:sync:meta, params are ", Object.values(messages), Object.values(signals), Object.entries(strategies))
      event.returnValue = 'done'
      this._instance.syncMetaData(Object.values(messages), Object.values(signals), Object.entries(strategies))
      // event.sender.send('action:sync:meta', 'done')
    })
    ipcMain.on('action:load:ammos', (event, msgIds) => {
      event.returnValue = 'done'
      this._instance.setAmmos(msgIds)
    })
    ipcMain.on('action:add:ammo', (event, id) => {
      event.returnValue = 'done'
      this._instance.addAmmo(id)
    })
    ipcMain.on('action:remove:ammo', (event, id) => {
      event.returnValue = 'done'
      this._instance.removeAmmo(id)
    })
    ipcMain.on('action:start', (event) => {
      event.returnValue = 'done'
      this._instance.start()
    })
    ipcMain.on('action:stop', (event) => {
      event.returnValue = 'done'
      this._instance.stop()
    })
    ipcMain.on('action:fire', (event) => {
      event.returnValue = 'done'
      this._instance.fire()
    })
    ipcMain.on('action:ceasefire', (event) => {
      event.returnValue = 'done'
      this._instance.ceaseFire()
    })
    ipcMain.on('action:set:strategy', (event, entries) => {
      event.returnValue = 'done'
      this._instance.setAmmoPartBuildStrategy(entries)
    })
  }

}

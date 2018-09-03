// const { Agent, IntelligenceAgency } = require('bindings')('can')
import { entries } from '../utils/object'
import can from 'node-can'
const {ipcMain} = require('electron')

const _IntelligenceAgency = can.IntelligenceAgency;

export default class IntelligenceAgeny {
  static onMessage(func) {
    _IntelligenceAgency.onMessageChange(message => func(message))
  }
}


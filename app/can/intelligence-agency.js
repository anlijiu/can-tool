// const { Agent, IntelligenceAgency } = require('bindings')('can')
import { entries } from '../utils/object'
const __mod = require('bindings')('can')
const {ipcMain} = require('electron')

const _IntelligenceAgency = require('bindings')('can').IntelligenceAgency;

export default class IntelligenceAgeny {
  static onMessage(func) {
    _IntelligenceAgency.onMessageChange(message => func(message))
  }
}


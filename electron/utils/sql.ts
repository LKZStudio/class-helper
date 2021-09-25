import { CardType } from './../dbInit';
import { contextBridge, ipcRenderer } from 'electron'
import { ConfigDb } from '../dbInit'

function addName(names: string[]) {
  for (let i = 0;i < names.length;i++) {
    ConfigDb.data.names.push(names[i])
  }
  ConfigDb.save()
}

function changeNames(names: string[]) {
  ConfigDb.data.names = names
  ConfigDb.save()
}

function changeRandomType(type: 0 | 1) {
  ConfigDb.data.randomType = type
  ConfigDb.save()
}

function changeDate(date: number) {
  ConfigDb.data.date = date
  ConfigDb.save()
}

function changeCardType(cardType: CardType) {
  ConfigDb.data.cardType = cardType
  ConfigDb.save()
}

function changeNoSpecial(type: boolean) {
  ConfigDb.data.noSpecial = type
  ConfigDb.save()
}

function changeTransparent(type: boolean) {
  ConfigDb.data.transparent = type
  ConfigDb.save()
}

function getConfigData() {
  return ConfigDb.data
}

export default { addName, changeNames, changeRandomType, changeDate, getConfigData, changeCardType, changeNoSpecial, changeTransparent }

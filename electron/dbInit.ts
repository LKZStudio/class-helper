import path from 'path'
import Database from "./utils/database"
export const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : path.join(__dirname, '../../../')
const database = path.join(assetsPath, 'database')

export interface CardType {
  number1: number
  number2: number
  number3: number
  number4: number
  number5: number
}

export interface Config {
  randomType: 0 | 1 // 随机点名器样式 0为滚动之后按暂停 1为直接随机出一个结果
  names: string[]

  date: number // 倒计时时间戳

  cardType: CardType
  noSpecial: boolean
}

export const ConfigDb = new Database<Config>(
  path.join(database, 'Config.json'), 
  { randomType: 0, names: [], date: 1111111111111, cardType: { number1: 10, number2: 8, number3: 6, number4: 4, number5: 2 }, noSpecial: false }
  );
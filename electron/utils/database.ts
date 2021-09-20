import fs from 'fs'
import path from 'path'

export default class Database<T> {
  file: string
  data: T
  defaultData: T

  constructor(file: string, defaultData: T) {
    this.file = file
    this.defaultData = defaultData
    if (!fs.existsSync(file)) {
      mkdirsSync(path.dirname(file))
      this.data = defaultData
      this.save()
    } else {
      let _fileContent = fs.readFileSync(file, 'utf8')
      let _data: T
      try {
        _data = JSON.parse(_fileContent)
      } catch {
        // @ts-ignore
        _data = _fileContent
      }
      this.data = _data
    }
  }

  save() {
    fs.writeFileSync(this.file, this.getTString());
  }

  private getTString(): string {
    if (typeof this.data === "object") {
      return JSON.stringify(this.data)
    } else if (typeof this.data === "bigint" || typeof this.data === "number" || typeof this.data === "symbol") {
      return this.data.toString()
    } else if (typeof this.data === "undefined" || typeof this.data === "function") {
      return "null"
    } else if (typeof this.data === "boolean") {
      return this.data ? "true" : "false"
    } else if (typeof this.data === "string") {
      return this.data
    }
    return "null"
  }
}

function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
import React, { useState, useEffect } from 'react'
import './style.css'

export function Index() {
  const [nowPage, setNowPage] = useState("timer")
  const [notice, setNotice] = useState("无提示")
  const [checked, setChecked] = useState(window.Main.getConfigData().randomType)
  const [names, setNames] = useState(window.Main.getConfigData().names)

  const [name, setName] = useState("")
  const [order, setOrder] = useState(0)
  const [newOrder, setNewOrder] = useState(0)

  function changeNotice(text: string) {
    setNotice(text)
    window.setTimeout(() => {
      setNotice("无提示")
    }, 3500)
  }

  function changeNowPage(page: string) {
    return () => {
      setNowPage(page)
    }
  }

  function getNotNowPageStyle(page: string) {
    if (nowPage !== page) {
      return {display: 'none'}
    } else {
      return {}
    }
  }

  function getNowPageText() {
    if (nowPage === "timer") {
      return "倒计时"
    } else if (nowPage === "name") {
      return "点名器"
    } else if (nowPage === "about") {
      return "关于"
    }
  }

  function openUrl(url: string) {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      window.Main.openUrl(url)
    }
  }

  function changeDate(e: any) {
    window.Main.changeDate(new Date(e.target.value).getTime())
    changeNotice("日期保存成功")
  }

  function changeRandomType(e: any) {
    if (e.target.id === "type1") {
      setChecked(1)
    } else if (e.target.id === "type0") {
      setChecked(0)
    }
  }

  function changeInput(e: any, v: any) {
    if (isNaN(parseInt(e.target.value))) {
      v(e.target.value)
    } else {
      v(parseInt(e.target.value))
    }
  }

  function submitName(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    window.Main.addName(name.split("|"))
    setNames(window.Main.getConfigData().names)
    setName("")
    changeNotice("新名字添加成功")
  }

  function submitOrder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if ((order - 1) > names.length || order < 1 || (newOrder - 1) > names.length || newOrder < 1) {
      changeNotice("超出序号范围！")
      return
    }
    let nowNames: string[] = JSON.parse(JSON.stringify(names))
    nowNames.splice(order - 1, 1)
    nowNames.splice(newOrder - 1, 0, names[order - 1])
    setNames(nowNames)
    window.Main.changeNames(nowNames)
    setOrder(0)
    setNewOrder(0)
    changeNotice("更换顺序成功")
  }

  function getNowDate() {
    const nowDate = new Date(window.Main.getConfigData().date)
    return `${nowDate.getFullYear()}-${getLengthChar(2, nowDate.getMonth() + 1)}-${getLengthChar(2, nowDate.getDate())}`
  }

  function getLengthChar(length: number, char: number) {
    if (char < 0) {
      if (length < char.toString().length - 1) {
        return NaN
      }
      let _result = "-"
      for (let i = 0;i < length - (char.toString().length - 1);i++) {
        _result += "0"
      }
      _result += char.toString().substring(1)
      return _result
    } else {
      if (length < char.toString().length) {
        return NaN
      }
      let _result = ""
      for (let i = 0;i < length - char.toString().length;i++) {
        _result += "0"
      }
      _result += char.toString()
      return _result
    }
  }

  useEffect(() => {
    if (checked !== window.Main.getConfigData().randomType) {
      window.Main.changeRandomType(checked)
      changeNotice("模式保存成功")
    }
  }, [checked])

  return (
    <div className="index">
      <h1>设置 - {getNowPageText()}</h1>
      <button onClick={changeNowPage('timer')}>倒计时</button>
      <button onClick={changeNowPage('name')}>点名器</button>
      <button onClick={changeNowPage('about')}>关于</button>
      <p className="notice">{notice}</p>
      <div className="timer" style={getNotNowPageStyle('timer')}>
        <input type="date" onChange={changeDate} defaultValue={getNowDate()} />
      </div>

      <div className="name" style={getNotNowPageStyle('name')}>
        <form action="">
          <label htmlFor="type0">轮换模式</label>
          <input name="randomType" type="radio" id="type0" checked={checked === 0} onChange={changeRandomType} />
          <label htmlFor="type1">直抽模式</label>
          <input name="randomType" type="radio" id="type1" checked={checked === 1} onChange={changeRandomType} />
        </form>
        <hr />
        <form>
          <h4>添加名字</h4>
          <label htmlFor="name">姓名（“|”分割多个名字）：</label>
          <input type="text" name="name" value={name} onChange={e => {changeInput(e, setName)}} />
          <button type="submit" onClick={submitName}>添加</button>
        </form>
        <form>
          <h4>更换顺序</h4>
          <label htmlFor="name">更换者序号：</label>
          <input type="number" name="order" value={order} onChange={e => {changeInput(e, setOrder)}} />
          <br/>
          <label htmlFor="name">新序号（会将包含这个序号以后的名字往后排）：</label>
          <input type="number" name="newOrder" value={newOrder} onChange={e => {changeInput(e, setNewOrder)}} />
          <button type="submit" onClick={submitOrder}>更换</button>
        </form>
        <hr />
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>名字</th>
            </tr>
          </thead>
          <tbody>
            {
              names.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className="about" style={getNotNowPageStyle('about')}>
        作者：无名小卒<br/>
        使用方法：自己摸索<br/>
        图标版权：仅供学习使用，请勿商用！<br/>
        GitHub：<a onClick={openUrl("https://github.com/LKZStudio/class-helper")}>https://github.com/LKZStudio/class-helper</a><br/>
        Gitee：<a onClick={openUrl("https://gitee.com/LKZStudio/class-helper")}>https://gitee.com/LKZStudio/class-helper</a>
      </div>
    </div>
  )
}
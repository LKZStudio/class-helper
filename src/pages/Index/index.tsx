import React, { useState, useEffect } from 'react'
import './style.css'

export function Index() {
  const [nowPage, setNowPage] = useState("timer")
  const [notice, setNotice] = useState("无提示")
  const [checked, setChecked] = useState(window.Main.getConfigData().randomType)
  const [names, setNames] = useState(window.Main.getConfigData().names)
  const [numbers, setNumbers] = useState(window.Main.getConfigData().cardType)
  const [noSpecial, setNoSpecial] = useState(window.Main.getConfigData().noSpecial)
  const [transparent, setTransparent] = useState(window.Main.getConfigData().transparent)

  const [name, setName] = useState("")
  const [order, setOrder] = useState(0)
  const [newOrder, setNewOrder] = useState(0)
  const [ord, setOrd] = useState(0)

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
    } else if (nowPage === "luckDraw") {
      return "抽奖"
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

  function changeCardType(order: number) {
    return (e: any) => {
      if (order === 1) {
        setNumbers({
          number1: e.target.value,
          number2: numbers.number2,
          number3: numbers.number3,
          number4: numbers.number4,
          number5: numbers.number5
        })
      } else if (order === 2) {
        setNumbers({
          number1: numbers.number1,
          number2: e.target.value,
          number3: numbers.number3,
          number4: numbers.number4,
          number5: numbers.number5
        })
      } else if (order === 3) {
        setNumbers({
          number1: numbers.number1,
          number2: numbers.number2,
          number3: e.target.value,
          number4: numbers.number4,
          number5: numbers.number5
        })
      } else if (order === 4) {
        setNumbers({
          number1: numbers.number1,
          number2: numbers.number2,
          number3: numbers.number3,
          number4: e.target.value,
          number5: numbers.number5
        })
      } else if (order === 5) {
        setNumbers({
          number1: numbers.number1,
          number2: numbers.number2,
          number3: numbers.number3,
          number4: numbers.number4,
          number5: e.target.value
        })
      }
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

  function submitOrd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if ((ord - 1) > names.length || ord < 1) {
      changeNotice("超出序号范围！")
      return
    }
    let nowNames: string[] = JSON.parse(JSON.stringify(names))
    nowNames.splice(ord - 1, 1)
    setNames(nowNames)
    window.Main.changeNames(nowNames)
    setOrd(0)
    changeNotice("删除成功")
  }

  function submitCardType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    window.Main.changeCardType(numbers)
    changeNotice("保存刮刮卡成功")
  }

  function submitTransparent() {
    window.Main.changeTransparent(!transparent)
    setTransparent(!transparent)
    changeNotice("保存是否透明成功")
  }

  function submitNoSpecial() {
    window.Main.changeNoSpecial(!noSpecial)
    setNoSpecial(!noSpecial)
    changeNotice("保存是否需要特殊刮刮卡成功")
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
      <button onClick={changeNowPage('luckDraw')}>抽奖</button>
      <button onClick={changeNowPage('name')}>点名器</button>
      <button onClick={changeNowPage('about')}>关于</button>
      <p className="notice">{notice}</p>
      <div className="timer" style={getNotNowPageStyle('timer')}>
        <input type="date" onChange={changeDate} defaultValue={getNowDate()} /><br />
        <label htmlFor="transparent">是否透明：</label>
        <input type="checkbox" checked={transparent} name="transparent" onChange={submitTransparent} />
      </div>

      <div className="luck" style={getNotNowPageStyle('luckDraw')}>
        <form>
          <label htmlFor="number1">1积分个数：</label>
          <input type="number" id="number1" value={numbers.number1} onChange={changeCardType(1)} /><br />
          <label htmlFor="number2">2积分个数：</label>
          <input type="number" id="number2" value={numbers.number2} onChange={changeCardType(2)} /><br />
          <label htmlFor="number3">3积分个数：</label>
          <input type="number" id="number3" value={numbers.number3} onChange={changeCardType(3)} /><br />
          <label htmlFor="number4">4积分个数：</label>
          <input type="number" id="number4" value={numbers.number4} onChange={changeCardType(4)} /><br />
          <label htmlFor="number5">5积分个数：</label>
          <input type="number" id="number5" value={numbers.number5} onChange={changeCardType(5)} /><br />
          <button type="submit" onClick={submitCardType}>保存</button><br/>
        </form>
        <label htmlFor="noSpecial">特殊刮刮卡？</label>
        <input type="checkbox" checked={!noSpecial} name="noSpecial" onChange={submitNoSpecial} />
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
          <h4>删除名字</h4>
          <label htmlFor="ord">序号：</label>
          <input type="text" name="ord" value={ord} onChange={e => {changeInput(e, setOrd)}} />
          <button type="submit" onClick={submitOrd}>删除</button>
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
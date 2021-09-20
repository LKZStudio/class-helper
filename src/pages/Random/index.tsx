import './style.css'
import { useState, useEffect } from 'react'

let _isRandoming = false
export function Random() {
  const [nowName, setNowName] = useState("敬请期待")
  const [nameList, setNameList] = useState([] as string[])
  const [needRepeat, setNeedRepeat] = useState(false)
  const [isRandoming, setIsRandoming] = useState(false)
  const [nowOrder, setNowOrder] = useState(0)

  function addOrder() {
    const nowOrder = getNowOrder()
    const nameList = getNameList()
    console.log(nowOrder, nameList.length)
    if (nowOrder >= nameList.length) {
      setSetNowOrder(0)
    } else {
      setSetNowOrder(nowOrder + 1)
    }
    if (_isRandoming) {
      setTimeout(addOrder, 2000)
    }
  }

  function setSetNowOrder(value: number) {
    setNowOrder(value)
  }

  function getNowOrder() {
    return nowOrder
  }

  function getNameList() {
    return nameList
  }

  function start() {
    setIsRandoming(true)
    _isRandoming = true
    setTimeout(addOrder, 2000)
  }

  function stop() {
    setIsRandoming(false)
    _isRandoming = false
    removeName(nowOrder)
  }

  function getRandomName() {
    const ranNum = randomNum(0, nameList.length - 1)
    setNowName(nameList[ranNum])
    removeName(ranNum)
  }

  function removeName(where: number) {
    if (!needRepeat) {
      let newNameList: string[] = JSON.parse(JSON.stringify(nameList))
      newNameList.splice(where, 1)
      if (newNameList.length === 0) {
        setNameList(window.Main.getConfigData().names)
      } else {
        setNameList(newNameList)
      }
    }
  }

  function refreshPage() {
    window.location.reload()
  }

  function randomNum(minNum: number,maxNum: number) { 
    switch(arguments.length) { 
      case 1: 
          return parseInt((Math.random() * minNum + 1).toString(), 10); 
      case 2: 
          return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10); 
      default: 
        return 0; 
    }
  }

  function changeRemoveName() {
    setNeedRepeat(!needRepeat)
  }

  function needRestPeople() {
    return needRepeat ? {display: 'none'} : {}
  }

  function isRandomingStyle(type: boolean) {
    if (type === isRandoming) {
      return {}
    } else {
      return {display: 'none'}
    }
  }

  useEffect(() => {
    if (!needRepeat) {
      setNameList(window.Main.getConfigData().names)
    }
  }, [needRepeat])

  useEffect(() => {
    if (window.Main.getConfigData().randomType === 0) {
      setNowName(nameList[nowOrder])
    }
  }, [nowOrder])

  return (
    <div className="random">
      <h2>幸运大抽奖</h2>
      <p>幸运儿<span style={needRestPeople()}>（本轮还剩 {nameList.length} 人没抽）</span>：</p>
      <h1 className="goal">{nowName}</h1>
      {
        window.Main.getConfigData().randomType === 0 ? (
          <>
            <button className="main" onClick={start} style={isRandomingStyle(false)}>谁是幸运儿呢？</button>
            <button className="main" onClick={stop} style={isRandomingStyle(true)}>就你啦</button>
          </>
        ) : (
          <button className="main" onClick={getRandomName}>随机</button>
        )
      }
      <button className="refresh" onClick={refreshPage}>刷新</button><br />
      <label htmlFor="needRepeat">是否重复抽取（点击即生效）：</label>
      <input type="checkbox" name="needRepeat" onChange={changeRemoveName} checked={needRepeat} />
    </div>
  )
}
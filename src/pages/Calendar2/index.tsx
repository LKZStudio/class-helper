import { useState, useEffect } from 'react'
import './style.css'

export function Calendar2() {
  const [date, setDate] = useState(window.Main.getConfigData().date)
  const [transparent, setTransparent] = useState(window.Main.getConfigData().transparent)
  const [left, setLeft] = useState({day: "942", hour: "22", minute: "45", second: "56"})
  const [trigger, setTrigger] = useState(false)

  function toggleTrigger() {
    setTrigger(!trigger)
  }

  function getNowDate() {
    const nowDate = new Date(window.Main.getConfigData().date)
    return `${nowDate.getFullYear()}年${getLengthChar(2, nowDate.getMonth() + 1)}月${getLengthChar(2, nowDate.getDate())}日`
  }

  function getLengthChar(length: number, char: number) {
    if (char < 0) {
      if (length < char.toString().length - 1) {
        return char.toString()
      }
      let _result = "-"
      for (let i = 0;i < length - (char.toString().length - 1);i++) {
        _result += "0"
      }
      _result += char.toString().substring(1)
      return _result
    } else {
      if (length < char.toString().length) {
        return char.toString()
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
    let date1 = new Date(date);  //开始时间
    let date2 = new Date();    //结束时间
    let date3 = date2.getTime() - date1.getTime();   //时间差的毫秒数      

    // 计算相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000))
    let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600*1000))
    //计算相差分钟数
    let leave2 = leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60*1000))
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)

    console.log(-days, -hours, -minutes, -seconds)
    
    setLeft({
      day: getLengthChar(3, -days),
      hour: getLengthChar(2, -hours),
      minute: getLengthChar(2, -minutes),
      second: getLengthChar(2, -seconds)
    })
    setTimeout(toggleTrigger, 1000)
  }, [trigger])

  return (
    <div className={transparent ? "transparent-calendar2" : "calendar2"}>
      <p>倒计时：<span className="day">{left.day}</span>天<span className="hour">{left.hour}</span>时<span className="minute">{left.minute}</span>分<span className="second">{left.second}</span>秒</p>
    </div>
  )
}
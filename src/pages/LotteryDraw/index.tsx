import { useState, useEffect } from 'react'
import { SquareCard } from '../../components/SquareCard'
import './style.css'

interface Props {
  left: string
  middle: string
  right: string
}

export function LotteryDraw() {
  const [cardType, setCardType] = useState(window.Main.getConfigData().cardType)
  const [noSpecial, setNoSpecial] = useState(window.Main.getConfigData().noSpecial)
  const [cards, setCards] = useState([] as Props[])

  function randomNum(min: number,max: number) { 
    let n = max - min
    if (n == 0) {
        return max
    } else if (n < 0) {
        [max, min] = [min, max]
        n = Math.abs(n)
    }

    return ((Math.random() * ++n) >> 0) + min
  }

  function shuffle<T>(arr: Array<T>) {
    console.log(arr)
    let n = arr.length
    let newArr = []
    while(n) {
      let i = Math.floor(Math.random()*n--)
      newArr.push(arr.splice(i, 1)[0])
    }
    return newArr;
  }

  function once(nowNum: number): Props {
    if (noSpecial) {
      return {
        left: "",
        middle: nowNum.toString(),
        right: ""
      }
    }
    const type = randomNum(1, 4)
    if (type === 1) {
      // 只有中间显示数字
      return {
        left: "",
        middle: "1",
        right: ""
      }
    } else if (type === 2 || type === 3) {
      // 左边 + 中间 or 右边 + 中间
      const middle = randomNum(1, 4)
      const _type = randomNum(1, 4)
      let left = ""
      let right = ""
      if (_type === 1) {
        // +
        left = `${nowNum - middle} +`
        right = `+ (${nowNum - middle})`
      }

      if (_type === 2) {
        // -
        left = `${nowNum + middle} -`
        right = `- ${middle - nowNum}`
      }

      if (_type === 3) {
        // *
        if (nowNum % middle !== 0) {
          left = `0.4 +`
          right = `+ 0.8`
        } else {
          left = `${nowNum / middle} *`
          right = `* ${nowNum / middle}`
        }
      }
      
      if (_type === 4) {
        // /
        left = `${nowNum * middle} /`
        if (middle % nowNum !== 0) {
          right = "- 0.2"
        } else {
          right = `/ ${middle / nowNum}`
        }
      }

      if (type === 2) {
        // 左边 + 中间
        return {
          left: left,
          middle: middle.toString(),
          right: ""
        }
      } else if (type === 3) {
        // 右边 + 中间
        return {
          left: "",
          middle: middle.toString(),
          right: right
        }
      }
    } else if (type === 4) {
      return {
        left: `${randomNum(1, 2)} +`,
        middle: nowNum.toString(),
        right: ""
      }
    }
    return {left: "", middle: nowNum.toString(), right: ""}
  }

  useEffect(() => {
    let _cards: Props[] = []
    for (let i = 0;i < cardType.number1;i++) {
      _cards.push(once(1))
    }
    for (let i = 0;i < cardType.number2;i++) {
      _cards.push(once(2))
    }
    for (let i = 0;i < cardType.number3;i++) {
      _cards.push(once(3))
    }
    for (let i = 0;i < cardType.number4;i++) {
      _cards.push(once(4))
    }
    for (let i = 0;i < cardType.number5;i++) {
      _cards.push(once(5))
    }
    setCards(shuffle<Props>(_cards))
  }, [])

  return (
    <div className="lottery-draw">
      <h1>Choose one you like!</h1>
      <div className="cards">
        {
          cards.map((value, index) => {
            return (
              <SquareCard left={value.left} middle={value.middle} right={value.right} key={index} />
            )
          })
        }
      </div>
    </div>
  )
}

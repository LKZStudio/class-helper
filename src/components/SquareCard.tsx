import React, { useRef, useEffect, useState } from 'react'
import './cardsStyle.css'
// @ts-ignore
import square from '../images/square.png'
// @ts-ignore
import scrape from '../html/scrape.html'

export function SquareCard() {

  useEffect(() => {
    console.log(scrape)
  }, [])

  return (
    <div className="component-square-card">
      <div className="component-square-card-content" style={{backgroundImage: `url(${square})`}} id="square-card">
        <span className="component-left-number">3-</span>
        <span className="component-key-number">1</span>
        <span className="component-right-number">1</span>
        <iframe srcDoc={scrape}></iframe>
      </div>
    </div>
  )
}

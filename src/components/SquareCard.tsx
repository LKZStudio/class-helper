import React, { useRef, useEffect, useState } from 'react'
import './cardsStyle.css'
// @ts-ignore
import square from '../images/square.png'
// @ts-ignore
import scrape from '../html/scrape.html'

interface Props {
  left: string
  middle: string
  right: string
}

export function SquareCard(props: Props) {
  return (
    <div className="component-square-card">
      <div className="component-square-card-content" style={{backgroundImage: `url(${square})`}} id="square-card">
        <span className="component-left-number">{props.left}</span>
        <span className="component-middle-number">{props.middle}</span>
        <span className="component-right-number">{props.right}</span>
        <iframe srcDoc={scrape}></iframe>
      </div>
    </div>
  )
}

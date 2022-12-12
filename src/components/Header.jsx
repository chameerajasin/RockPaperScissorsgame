import React from 'react'
import classes from './Header.module.css'

function Header({ balance, betAmount, winAmount }) {
  return (
    <div className={classes.topBar}>
      <h1>
        BALANCE: <p>{balance}</p>
      </h1>
      <h1>
        BET:<p>{betAmount}</p>
      </h1>
      <h1>
        WIN:<p>{winAmount}</p>
      </h1>
    </div>
  )
}

export default Header

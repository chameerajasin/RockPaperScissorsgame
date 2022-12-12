import React from 'react'
import classes from './Box.module.css'

function Box({ name, bet, id, onbetHandler, disabled }) {
  let dynmcClasse = ''

  if (name === 'ROCK') {
    dynmcClasse = classes.rock
  }

  if (name === 'PAPER') {
    dynmcClasse = classes.paper
  }

  if (name === 'SCISSORS') {
    dynmcClasse = classes.scissors
  }

  const cssClasses = `${classes.silection} ${dynmcClasse}`

  return (
    <button
      className={cssClasses}
      id={id}
      onClick={onbetHandler}
      disabled={disabled}
    >
      {bet > 0 && <p>{bet}</p>}
      <h2>{name}</h2>
    </button>
  )
}

export default Box

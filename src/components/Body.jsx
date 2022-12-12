import React, { useReducer, useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../App'
import Box from './Box'
import classes from './Body.module.css'

function Body() {
  const { state, dispatch } = useContext(AppContext)
  const [message, setMessage] = useState('PICK YOUR POSITIONS')
  const [displaywin, setDisplaywin] = useState(false)
  const [display, setDisplay] = useState(false)

  let winLoseclass = ''

  if (state.STATUS === 'won') {
    winLoseclass = classes.won
  }
  if (state.STATUS === 'lose') {
    winLoseclass = classes.lose
  }

  const playHandler = (clear) => {
    if (clear) {
      setMessage('PICK YOUR POSITIONS')
      setDisplaywin(false)
      dispatch({ type: 'CLEAR' })
      return
    }
    setDisplay(true)
    setMessage('')
    setTimeout(() => {
      setDisplay(false)
      setDisplaywin(true)
    }, 1500)

    dispatch({ type: 'CLEAR_INIT' })
    const hands = ['ROCK', 'PAPER', 'SCISSORS']
    const comHand = hands[Math.floor(Math.random() * 3)]
    const selectedBoxes =
      state.ROCK.selected * 1 +
      state.PAPER.selected * 1 +
      state.SCISSORS.selected * 1

    dispatch({ type: 'COM', payload: comHand })

    if (comHand === 'ROCK' && state.PAPER.selected) {
      const winnings =
        selectedBoxes === 1
          ? state.BETAMOUNT.PAPER * 14
          : state.BETAMOUNT.PAPER * 3

      dispatch({ type: 'WINNING_HAND', payload: 'PAPER' })
      dispatch({ type: 'STATUS', payload: 'won' })
      dispatch({
        type: 'ADD_WINNINGS',
        payload: winnings,
      })

      dispatch({ type: 'READY_TO_CLEAR', payload: true })
    } else if (comHand === 'PAPER' && state.SCISSORS.selected) {
      const winnings =
        selectedBoxes === 1
          ? state.BETAMOUNT.SCISSORS * 14
          : state.BETAMOUNT.SCISSORS * 3

      dispatch({ type: 'WINNING_HAND', payload: 'SCISSORS' })
      dispatch({ type: 'STATUS', payload: 'won' })
      dispatch({
        type: 'ADD_WINNINGS',
        payload: winnings,
      })

      dispatch({ type: 'READY_TO_CLEAR', payload: true })
    } else if (comHand === 'SCISSORS' && state.ROCK.selected) {
      const winnings =
        selectedBoxes === 1
          ? state.BETAMOUNT.ROCK * 14
          : state.BETAMOUNT.ROCK * 3

      dispatch({ type: 'WINNING_HAND', payload: 'ROCK' })
      dispatch({ type: 'STATUS', payload: 'won' })
      dispatch({
        type: 'ADD_WINNINGS',
        payload: winnings,
      })

      dispatch({ type: 'READY_TO_CLEAR', payload: true })
    } else {
      const losingText =
        `${state.ROCK.selected ? 'ROCK' : ' '}` +
        `${state.SCISSORS.selected ? 'SCISSORS' : ' '}` +
        `${state.PAPER.selected ? 'PAPER' : ' '}`
      dispatch({ type: 'STATUS', payload: 'lose' })
      dispatch({ type: 'LOSING_HANDS', payload: losingText })
      dispatch({ type: 'READY_TO_CLEAR', payload: true })
    }
  }

  const selectedBoxes =
    state.ROCK.selected * 1 +
    state.PAPER.selected * 1 +
    state.SCISSORS.selected * 1

  return (
    <div>
      <div className={classes.displayheight}>
        {display && (
          <div className={classes.display}>
            <h2 className={classes.disstate}>{state.COM}</h2>{' '}
            <h2 className='vs'>vs</h2>{' '}
            <h2 className={classes.disstate}>
              {state.STATUS === 'won' ? state.WINNING_HAND : state.LOSING_HANDS}
            </h2>
          </div>
        )}
      </div>
      {displaywin && (
        <>
          <div className={winLoseclass}>
            {state.STATUS === 'won' ? state.WINNING_HAND : state.LOSING_HANDS}
            {'  '}
            {state.STATUS.toUpperCase()}
          </div>
          <div className={classes.winscore}>
            <h2>YOU WIN {state.WIN_AMOUNT}</h2>
          </div>
        </>
      )}
      <div className={classes.message}>{message}</div>
      <div className={classes.box}>
        {Object.values(state).map((bet) => {
          if (
            bet.name === 'ROCK' ||
            bet.name === 'PAPER' ||
            bet.name === 'SCISSORS'
          ) {
            return (
              <Box
                key={bet.name}
                name={bet.name}
                bet={bet.value}
                disabled={selectedBoxes == 2 && !state[bet.name].selected}
                onbetHandler={() => {
                  dispatch({ type: bet.name })
                }}
              />
            )
          }
        })}
      </div>
      <div>
        <button
          onClick={() => playHandler(state.READY_TO_CLEAR)}
          disabled={state.BALANCE < 0}
        >
          {state.COM ? 'CLEAR' : 'PLAY'}
        </button>
      </div>
    </div>
  )
}

export default Body

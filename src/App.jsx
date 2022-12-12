import Body from './components/Body'
import Header from './components/Header'
import { reducer, initialBetState } from './store'
import './App.css'
import { useState, useReducer, createContext } from 'react'

export const AppContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialBetState)
  const providerState = {
    state,
    dispatch,
  }
  return (
    <div className='App'>
      <AppContext.Provider value={providerState}>
        <Header
          balance={state.BALANCE}
          betAmount={state.BETAMOUNT.TOTAL}
          winAmount={state.WIN_AMOUNT}
        />
        <Body />
      </AppContext.Provider>
    </div>
  )
}

export default App

export const initialBetState = {
  ROCK: { name: 'ROCK', value: 0, selected: false },
  PAPER: { name: 'PAPER', value: 0, selected: false },
  SCISSORS: { name: 'SCISSORS', value: 0, selected: false },
  COM: '',
  BALANCE: 5000,
  BETAMOUNT: {
    ROCK: 0,
    PAPER: 0,
    SCISSORS: 0,
    TOTAL: 0,
  },
  WINNING_HAND: '',
  LOSING_HANDS: '',
  STATUS: '',
  READY_TO_CLEAR: false,
  WIN_AMOUNT: 0,
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ROCK':
      return {
        ...state,
        ROCK: { ...state.ROCK, value: state.ROCK.value + 500, selected: true },
        BALANCE: state.BALANCE - 500,
        BETAMOUNT: {
          ROCK: state.BETAMOUNT.ROCK + 500,
          TOTAL: state.BETAMOUNT.TOTAL + 500,
          PAPER: state.BETAMOUNT.PAPER,
          SCISSORS: state.BETAMOUNT.SCISSORS,
        },
      }
    case 'PAPER':
      return {
        ...state,
        PAPER: {
          ...state.PAPER,
          value: state.PAPER.value + 500,
          selected: true,
        },
        BALANCE: state.BALANCE - 500,
        BETAMOUNT: {
          PAPER: state.BETAMOUNT.PAPER + 500,
          TOTAL: state.BETAMOUNT.TOTAL + 500,
          ROCK: state.BETAMOUNT.ROCK,
          SCISSORS: state.BETAMOUNT.SCISSORS,
        },
      }
    case 'SCISSORS':
      return {
        ...state,
        SCISSORS: {
          ...state.SCISSORS,
          value: state.SCISSORS.value + 500,
          selected: true,
        },
        BALANCE: state.BALANCE - 500,
        BETAMOUNT: {
          SCISSORS: state.BETAMOUNT.SCISSORS + 500,
          TOTAL: state.BETAMOUNT.TOTAL + 500,
          ROCK: state.BETAMOUNT.ROCK,
          PAPER: state.BETAMOUNT.PAPER,
        },
      }
    case 'CLEAR':
      return {
        ...initialBetState,
        BALANCE: state.BALANCE,
        READY_TO_CLEAR: false,
      }
    case 'CLEAR_INIT':
      return {
        ...state,
        WINNING_HAND: '',
        LOSING_HANDS: '',
      }
    case 'STATUS':
      return { ...state, STATUS: action.payload }
    case 'COM':
      return { ...state, COM: action.payload }
    case 'WINNING_HAND':
      return { ...state, WINNING_HAND: action.payload }
    case 'LOSING_HANDS':
      return { ...state, LOSING_HANDS: action.payload }
    case 'ADD_WINNINGS':
      return {
        ...state,
        BALANCE: state.BALANCE + action.payload,
        WIN_AMOUNT: action.payload,
      }
    case 'READY_TO_CLEAR':
      return { ...state, READY_TO_CLEAR: action.payload }
    default:
      throw new Error()
  }
}

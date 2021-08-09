const initialState = {
  errMsg: '',
  transaction: [],
  transfer: [],
};

const privateStore = (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_TRANSACTION': {
      return {
        ...state,
        transaction: action.payload,
      };
    }
    case 'MAKE_TRANSACTION_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'MAKE_TRANSFER': {
      return {
        ...state,
        transfer: action.payload,
      };
    }
    case 'MAKE_TRANSFER_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'TOP_UP': {
      return {
        ...state,
      };
    }
    case 'TOP_UP_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default privateStore;

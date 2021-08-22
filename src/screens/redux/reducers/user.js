const initialState = {
  home: false,
  splash: false,
  userSigned: {},
  history: [],
  first: [],
  second: [],
  third: [],
  transfer: null,
  pageInfo: [],
  historyById: [],
  updatePassword: false,
  updated: false,
  picToggle: false,
  errMsg: '',
  errPic: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SPLASH_TOGGLE': {
      return {
        ...state,
        splash: !state.splash,
      };
    }
    case 'HOME_TOGGLE': {
      return {
        ...state,
        home: !state.home,
        splash: state.splash,
      };
    }
    case 'GET_USER_SIGNED': {
      return {
        ...state,
        userSigned: action.payload,
      };
    }
    case 'UPDATE_FIRST_PROFILE': {
      return {
        ...state,
        first: action.payload,
        updated: !state.updated,
      };
    }
    case 'UPDATE_FIRST_PROFILE_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
        updated: state.updated,
      };
    }
    case 'UPLOAD_PICTURE': {
      return {
        ...state,
        picToggle: !state.picToggle,
      };
    }
    case 'UPLOAD_PICTURE_REJECTED': {
      return {
        ...state,
        errPic: action.error,
        picToggle: state.picToggle,
      };
    }
    case 'UPDATE_SECOND_PROFILE': {
      return {
        ...state,
        second: action.payload,
      };
    }
    case 'UPDATE_SECOND_PROFILE_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
      };
    }
    case 'UPDATE_THIRD_PROFILE': {
      return {
        ...state,
        third: action.payload,
      };
    }
    case 'UPDATE_THIRD_PROFILE_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
      };
    }
    case 'CONFIRM_PASSWORD': {
      return {
        ...state,
        updatePassword: !state.updatePassword,
      };
    }
    case 'CONFIRM_PASSWORD_REJECTED': {
      return {
        ...state,
        updatePassword: state.updatePassword,
        errMsg: action.error,
      };
    }
    case 'GET_USER_SIGN_FAILED': {
      return {
        ...state,
        errMsg: '',
      };
    }
    case 'EDIT_PASSWORD': {
      return {
        ...state,
        updatePassword: !state.updatePassword,
      };
    }
    case 'EDIT_PASSWORD_REJECTED': {
      return {
        ...state,
        updatePassword: !state.updatePassword,
        errMsg: action.error,
      };
    }
    case 'GET_HISTORY': {
      return {
        ...state,
        history: action.payload.history,
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'GET_HISTORY_NEXT': {
      return {
        ...state,
        history: [...state.history, ...action.payload.history],
        pageInfo: action.payload.pageInfo,
      };
    }
    case 'GET_HISTORY_BY_ID': {
      return {
        ...state,
        historyById: action.payload,
      };
    }
    case 'GET_USER_FOR_TRANSFER': {
      return {
        ...state,
        transfer: action.payload,
      };
    }
    case 'USER_DEFAULT': {
      return {
        ...state,
        transfer: null,
      };
    }
    case 'GET_USER_FOR_TRANSFER_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
      };
    }
    case 'ERROR_DEFAULT': {
      return {
        ...state,
        errMsg: '',
        errPic: '',
        updated: !state.updated,
        picToggle: !state.picToggle,
        updatePassword: false,
      };
    }
    case 'GET_DEFAULT_HISTORY': {
      return {
        ...state,
        history: [],
        pageInfo: [],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default user;

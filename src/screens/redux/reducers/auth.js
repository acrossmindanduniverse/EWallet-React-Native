const initialState = {
  data: {},
  onToggle: false,
  onAuth: false,
  info: null,
  fcmToken: null,
  token: null,
  signUpErrMsg: '',
  errMsg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SIGNUP': {
      return {
        ...state,
        onToggle: !state.onToggle,
      };
    }
    case 'AUTH_SIGNUP_REJECTED': {
      return {
        ...state,
        signUpErrMsg: action.error,
        onToggle: state.onToggle,
      };
    }
    case 'AUTH_SIGNIN': {
      return {
        ...state,
        data: action.payload.data,
        onAuth: true,
        info: action.payload,
      };
    }
    case 'AUTH_SIGNIN_REJECTED': {
      return {
        ...state,
        errMsg: action.error,
        onAuth: false,
      };
    }
    case 'DEFAULT_ERROR': {
      return {
        ...state,
        signUpErrMsg: '',
        errMsg: '',
        onToggle: false,
        onAuth: false,
      };
    }
    case 'REFRESH_TOKEN': {
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'REFRESH_TOKEN_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'AUTH_REGISTER_TOKEN': {
      return {
        ...state,
        fcmToken: action.payload,
      };
    }
    case 'AUTH_REGISTER_TOKEN_REJECTED': {
      return {
        ...state,
        errMsg: action.err,
      };
    }
    case 'GET_OTP': {
      return {
        ...state,
        otp: action.payload,
      };
    }
    case 'AUTH_LOGOUT': {
      return {
        ...state,
        data: {},
        info: null,
        token: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;

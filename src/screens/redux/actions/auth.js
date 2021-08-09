import {http} from '../../helpers/http';
import {APP_BACKEND_URL} from '@env';

export const authSignUp = setData => async dispatch => {
  const form = new URLSearchParams();
  form.append('email', setData.email);
  form.append('password', setData.password);
  form.append('phone', setData.phone);
  try {
    const {data} = await http().post(
      `${APP_BACKEND_URL}/auth/sign-up`,
      form.toString(),
    );
    dispatch({
      type: 'AUTH_SIGNUP',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_SIGNUP_REJECTED',
      error: err.response.data.data,
    });
    console.log(err);
  }
};

export const authRefreshToken = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('refreshToken', setData.refreshToken);

  try {
    const {data} = await http(token).post(
      `${APP_BACKEND_URL}/auth/refresh-token`,
      form,
    );
    dispatch({
      type: 'REFRESH_TOKEN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'REFRESH_TOKEN_REJECTED',
      err: err.response.data.data,
    });
  }
};

export const registerFcmToken = (authToken, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('token', setData.token);
  try {
    const {data} = await http(authToken).post(
      `${APP_BACKEND_URL}/auth/register-token`,
      form,
    );
    console.log(data, 'test data');
    dispatch({
      type: 'AUTH_REGISTER_TOKEN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_REGISTER_TOKEN_REJECTED',
      payload: err.response.data.data,
    });
  }
};

export const authSignIn = (setData, info) => async dispatch => {
  const form = new URLSearchParams();
  form.append('email', setData.email);
  form.append('password', setData.password);
  try {
    const {data} = await http(info).post(
      `${APP_BACKEND_URL}/auth/sign-in`,
      form.toString(),
    );
    await dispatch({
      type: 'AUTH_SIGNIN',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_SIGNIN_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const authLogOut = () => dispatch => {
  dispatch({
    type: 'AUTH_LOGOUT',
  });
};

export const errMsgDefault = () => dispatch => {
  dispatch({
    type: 'DEFAULT_ERROR',
  });
};

export const getOtp = data => dispatch => {
  dispatch({
    type: 'GET_OTP',
    payload: data,
  });
};

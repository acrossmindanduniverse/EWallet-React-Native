import {http} from './../../helpers/http';
const APP_BACKEND_URL = 'https://avaewallet.herokuapp.com';

export const getUserSigned = token => async dispatch => {
  try {
    const {data} = await http(token).get(`${APP_BACKEND_URL}/user`);
    dispatch({
      type: 'GET_USER_SIGNED',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_SIGN_FAILED',
      err: err.response.data.data,
    });
  }
};

export const getHistory = (token, key, sortBy, sort, num) => async dispatch => {
  console.log(key, 'key from action');
  try {
    if (num === undefined) {
      const {data} = await http(token).get(
        `${APP_BACKEND_URL}/user/history?search=${key}&sort[${sortBy}]=${sort}`,
      );
      dispatch({
        type: 'GET_HISTORY',
        payload: {
          history: data.data,
          pageInfo: data.pageInfo,
        },
      });
    } else {
      const {data} = await http(token).get(
        `${APP_BACKEND_URL}/user/history?search=${key}&sort[${sortBy}]=${sort}&page=${num}`,
      );
      dispatch({
        type: 'GET_HISTORY_NEXT',
        payload: {
          history: data.data,
          pageInfo: data.pageInfo,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getHistoryById = (token, id) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${APP_BACKEND_URL}/user/history-detail/${id}`,
    );
    dispatch({
      type: 'GET_HISTORY_BY_ID',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDefaultHistory = () => dispatch => {
  dispatch({
    type: 'GET_DEFAULT_HISTORY',
  });
};

export const updateFirstProfile = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('name', setData.name);
  try {
    const {data} = await http(token).put(
      `${APP_BACKEND_URL}/user/edit-profile`,
      form,
    );
    dispatch({
      type: 'UPDATE_FIRST_PROFILE',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_FIRST_PROFILE_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const uploadPicture = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('picture', {
    uri: setData.picture.uri,
    name: setData.picture.fileName,
    type: setData.picture.type,
  });
  try {
    const {data} = await http(token).put(
      `${APP_BACKEND_URL}/user/edit-profile`,
      form,
    );
    dispatch({
      type: 'UPLOAD_PICTURE',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPLOAD_PICTURE_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const updateSecondProfile = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('phone', setData.phone);
  try {
    const {data} = await http(token).put(
      `${APP_BACKEND_URL}/user/edit-profile`,
      form,
    );
    dispatch({
      type: 'UPDATE_SECOND_PROFILE',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_SECOND_PROFILE_REJECTED',
      error: err.response.data.data,
    });
  }
};
export const updateThirdProfile = (token, setData) => async dispatch => {
  const form = new FormData();
  form.append('email', setData.email);
  try {
    const {data} = await http(token).put(
      `${APP_BACKEND_URL}/user/edit-profile`,
      form,
    );
    dispatch({
      type: 'UPDATE_THIRD_PROFILE',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_THIRD_PROFILE_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const confirmPassword = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('password', setData.password);
  try {
    const {data} = await http(token).post(
      `${APP_BACKEND_URL}/user/confirm-password`,
      form,
    );
    dispatch({
      type: 'CONFIRM_PASSWORD',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'CONFIRM_PASSWORD_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const updatePassword = (token, setData) => async dispatch => {
  const form = new URLSearchParams({
    password: setData.password,
    resendPassword: setData.resendPassword,
  });
  try {
    const {data} = await http(token).put(
      `${APP_BACKEND_URL}/user/update-password`,
      form,
    );
    dispatch({
      type: 'EDIT_PASSWORD',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'EDIT_PASSWORD_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const getUserForTransfer = (token, phone) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${APP_BACKEND_URL}/user/phone?search=${phone}`,
    );
    console.log(data.data, 'test data');
    dispatch({
      type: 'GET_USER_FOR_TRANSFER',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_FOR_TRANSFER_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const errorDefault = () => dispatch => {
  dispatch({
    type: 'ERROR_DEFAULT',
  });
};

export const getUserDefault = () => dispatch => {
  dispatch({
    type: 'USER_DEFAULT',
  });
};

export const splashAction = () => dispatch => {
  dispatch({
    type: 'SPLASH_TOGGLE',
  });
};

export const homeAction = () => dispatch => {
  dispatch({
    type: 'HOME_TOGGLE',
  });
};

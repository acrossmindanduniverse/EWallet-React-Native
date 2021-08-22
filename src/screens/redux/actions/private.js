import {http} from '../../helpers/http';
import {APP_BACKEND_URL} from '@env';

// const APP_BACKEND_URL = 'https://avaewallet.herokuapp.com';

export const makeTransaction = (token, setData) => async dispatch => {
  console.log(setData, 'trx');
  try {
    const form = new URLSearchParams({
      item_id: setData.item_id,
      item_variant: setData.item_variant,
    });
    const {data} = await http(token).post(
      `${APP_BACKEND_URL}/private/transaction`,
      form,
    );
    dispatch({
      type: 'MAKE_TRANSACTION',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'MAKE_TRANSACTION_REJECTED',
      err: err.response.data.data,
    });
  }
};

export const createTopUp = (token, setData) => async dispatch => {
  const form = new URLSearchParams();
  form.append('balance', setData.balance);
  try {
    const {data} = await http(token).patch(
      `${APP_BACKEND_URL}/private/top-up`,
      form,
    );
    dispatch({
      type: 'TOP_UP',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'TOP_UP_REJECTED',
      error: err.response.data.data,
    });
  }
};

export const makeTransfer = (token, setData) => async dispatch => {
  try {
    const form = new URLSearchParams({
      deductedBalance: setData.deductedBalance,
      phone: setData.phone,
      message: setData.message,
    });
    const {data} = await http(token).post(
      `${APP_BACKEND_URL}/private/transfer`,
      form,
    );
    dispatch({
      type: 'MAKE_TRANSFER',
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: 'MAKE_TRANSFER_REJECTED',
      err: err.response.data.data,
    });
  }
};

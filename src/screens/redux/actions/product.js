import {http} from '../../helpers/http';
import {APP_BACKEND_URL} from '@env';

export const getAllProducts = () => async dispatch => {
  try {
    const {data} = await http().get(`${APP_BACKEND_URL}/product`);
    dispatch({
      type: 'GET_ALL_PRODUCTS',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProductDetail = id => async dispatch => {
  try {
    const {data} = await http().get(`${APP_BACKEND_URL}/detail/product/${id}`);
    dispatch({
      type: 'GET_DETAIL_PRODUCT',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  item: [],
  detailProduct: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS': {
      return {
        ...state,
        item: action.payload,
      };
    }
    case 'GET_DETAIL_PRODUCT': {
      return {
        ...state,
        detailProduct: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default product;

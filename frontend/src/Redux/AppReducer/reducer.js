import * as Types from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

export const appreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_MASSAGE_REQUEST: {
      return {
        isLoading: false,
        isError: false,
        data: [],
      };
    }

    case Types.GET_MASSAGE_SUCCUSS: {
      return {
        isLoading: false,
        isError: false,
        data: payload,
      };
    }

    case Types.GET_MASSAGE_FAILUER: {
      return {
        isLoading: false,
        isError: false,
        data: [],
      };
    }

    default:
      return state;
  }
};

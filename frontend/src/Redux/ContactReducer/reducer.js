import * as Types from "./actionType";
const initialState = {
  isLoading: false,
  allConact: [],
};

export const contactreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_CONTACT_REQUEST: {
      return {
        isLoading: true,
        allConact: [],
      };
    }

    case Types.GET_CONTACT_SUCCESS: {
      return {
        isLoading: false,
        allConact: payload,
      };
    }

    case Types.GET_CONTACT_FAILUER: {
      return {
        isLoading: false,
        allConact: [],
      };
    }
    default:
      return state;
  }
};

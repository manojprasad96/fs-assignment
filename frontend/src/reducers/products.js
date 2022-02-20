import {
    CREATE_PRODUCT,
    GET_PRODUCT_TYPES,
    RETRIEVE_ALL_VALID_PRODUCT,
    RETRIEVE_ALL_EXPIRED_PRODUCT,
    RETRIEVE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_ALL_PRODUCT,
    FIND_VALID_PRODUCT_BY_TYPE_MFD,
    FIND_EXPIRED_PRODUCT_BY_TYPE_MFD
  } from "../actions/types";
  const initialState = {
        "valid": [],
        "expired": [],
        "object": {},
        "types": []
  };
  function productReducer(state = initialState, action) {
    const { type, payload } = action;
    let newState = initialState;
    let key;
    switch (type) {
        case CREATE_PRODUCT:
            key = (payload.validTill < (new Date().getTime() - payload.manufacturedDate))? "expired" : "valid";
            newState[key] = [...state[key], ...[payload]]
            newState["object"] = ["object"]
            return {...state, ...newState};
        case GET_PRODUCT_TYPES:
            return {...state, ...{ "types": payload}};
        case RETRIEVE_ALL_VALID_PRODUCT:
            return {...state, ...{ "valid": payload}};
        case FIND_VALID_PRODUCT_BY_TYPE_MFD:
            return {...state, ...{ "valid": payload}};
        case RETRIEVE_ALL_EXPIRED_PRODUCT:
            return {...state, ...{ "expired": payload}};
        case FIND_EXPIRED_PRODUCT_BY_TYPE_MFD:
            return {...state, ...{ "expired": payload}};
        case RETRIEVE_PRODUCT:
            return {...state, ...{"object": payload}};
        case UPDATE_PRODUCT:
            newState["object"] = payload
            key = (payload.validTill < (new Date().getTime() - payload.manufacturedDate))? "expired" : "valid";
            newState[key] = state[key].map((product) => {
            if (product.productId === payload.productId) {
                return {
                ...product,
                ...payload,
                };
            } else {
                return product;
            }
            });
            return newState
        case DELETE_PRODUCT:
            newState["valid"] = state["valid"].filter(({ productId }) => productId !== payload.productId)
            newState["expired"] = state["expired"].filter(({ productId }) => productId !== payload.productId)
            if (state["object"] && state["object"].productId !== payload.productId) {
                newState["object"] = state["object"];
            }
            return newState;
        case DELETE_ALL_PRODUCT:
            return [];
        default:
            return state;
    }
  };
  export default productReducer;
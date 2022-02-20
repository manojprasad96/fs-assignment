import {
    CREATE_PRODUCT,
    GET_PRODUCT_TYPES,
    RETRIEVE_ALL_VALID_PRODUCT,
    RETRIEVE_ALL_EXPIRED_PRODUCT,
    RETRIEVE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    FIND_VALID_PRODUCT_BY_TYPE_MFD,
    FIND_EXPIRED_PRODUCT_BY_TYPE_MFD
  } from "./types";
import ProductService from "../services/ProductService";
export const createProduct = (product) => async (dispatch) => {
  try {
    const res = await ProductService.create(product);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getProductTypes = () => async (dispatch) => {
  try {
    const res = await ProductService.getProductTypes();
    dispatch({
      type: GET_PRODUCT_TYPES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveValidProducts = () => async (dispatch) => {
  try {
    const res = await ProductService.getAllValid();
    dispatch({
      type: RETRIEVE_ALL_VALID_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveExpiredProducts = () => async (dispatch) => {
  try {
    const res = await ProductService.getAllExpired();
    dispatch({
      type: RETRIEVE_ALL_EXPIRED_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const res = await ProductService.update(id, data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await ProductService.delete(id);
    dispatch({
      type: DELETE_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findProductsById = (id) => async (dispatch) => {
  try {
    const res = await ProductService.findById(id);
    dispatch({
      type: RETRIEVE_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findValidByTypeAndMFD = (type, time, timeOp) => async (dispatch) => {
  try {
    const res = await ProductService.getValidByTypeAndMFD(type, time, timeOp);
    dispatch({
      type: FIND_VALID_PRODUCT_BY_TYPE_MFD,
      payload: res.data,
    });

  } catch (err) {
    console.log(err);
  }
};

export const findExpiredByTypeAndMFD = (type, time, timeOp) => async (dispatch) => {
  try {
    const res = await ProductService.getExpiredByTypeAndMFD(type, time, timeOp);
    dispatch({
      type: FIND_EXPIRED_PRODUCT_BY_TYPE_MFD,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
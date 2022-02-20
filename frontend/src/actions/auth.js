import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
import AuthService from "../services/AuthService";

export const signUp = ({username, password, roles}) => async (dispatch) => {
    try {
      const res = await AuthService.signUp({username, password, roles});
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: res.data.message,
      });
      return Promise.resolve();
    } catch (err) {
        const message =
            (err.response &&
                err.response.data &&
                err.response.data.message) ||
                err.message ||
                err.toString();
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    }
};

export const loginUser = ({username, password}) => async (dispatch) => {
    try {
      const res = await AuthService.loginUser({username, password});
      dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: res },
      });
      return Promise.resolve();
    } catch (err) {
        const message =
        (err.response &&
            err.response.data &&
            err.response.data.message) ||
            err.message ||
            err.toString();
        dispatch({
        type: LOGIN_FAIL,
        });
        dispatch({
        type: SET_MESSAGE,
        payload: message,
        });
        return Promise.reject();
    }
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
};
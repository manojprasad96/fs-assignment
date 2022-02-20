import React, { useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import styled from 'styled-components';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AppContext from '../../context/AppContext';
import { loginUser } from "../../actions/auth";
import { required } from "../../utils/utils";


const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    .error-msg {
        font-size: 14px;
        color: red;
    }
    .login-container {
        margin-top: 200px;
        margin-top: 200px;
        padding: 32px;
        background-color: #ebeef3;
        border-radius: 10px;
        box-shadow: 0 1px 4px 0 #cfd7df, 0 4px 24px 0 #ebeff3;
        width: 300px;
        text-align: center;
        > h1 {
            margin-bottom: 30px;
        }
        > a {
            text-align: center;
        }
        > form {
            font-size: 20px;
            > div {
                display: flex;
                flex-direction: column;
                margin: 20px 0px;
            }
            > div:nth-child(3) {
                text-align: center;
            }
            > div > label {
                margin-bottom: 5px;
                text-align: left;
            }
            > div > div {
                font-size: 16px;
            }
            > div > div > input {
                flex:1;
                border: 1px solid #CFD7DF;
                background-color: #ffffff;
                box-shadow: inset 0 1px 2px 0 rgb(24 50 71 / 5%);
                padding: 5px 12px;
                min-height: 32px;
                border-radius: 4px;
                line-height: 20px;
                color: #12344D;
                &::placeholder {
                    color: #92A2B1;
                }
            }
            > div > button {
                border: none;
                border-radius: 6px;
                padding: 5px 10px;
                color: #fff;
                background-color: #0e6efd;
                border-color: #0d6efd;
                cursor: pointer;
                line-height: 1.5;
                font-size: 16px;
            }
        }
    }
`;

function Login({ history }) {
    const form = useRef();
    const checkBtn = useRef();
    const myContext = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = async e  => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(await loginUser({
                "username": username,
                "password": password
            }))
            .then(() => {
                history.push("/home");
                myContext.setTitle("Home");
            })
            setLoading(false);
        } else {
            setLoading(false);
        }
    }
    if (isLoggedIn) {
        return <Redirect to="/home" />;
    }
    return (
        <LoginWrapper>
            <div className='login-container'>
                <h1>Login</h1>
                <Form onSubmit={handleSubmit} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <Link to={"/signup"} >
                    Sign up
                </Link>
            </div>
        </LoginWrapper>
    )
}

Login.displayName = "Login";

export default withRouter(Login);
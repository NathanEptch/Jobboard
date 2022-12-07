import React, {useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import  isEmail  from "validator";


import AuthService from "../../service/auth.service";
import {Link, useNavigate} from "react-router-dom";



const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const RegisterMod = () => {
    const form = useRef();
    const checkBtn = useRef();
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [is_mod, setismod] = useState(true);
    const [Is_admin, setisadmin] = useState(true);

    useEffect(() => {
        setisadmin(false)
        setismod(true)

    })
    const onChangename = (e) => {
        const name = e.target.value;
        setName(name);


    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);

    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);

    };

    const handleRegister = (e) => {
        e.preventDefault();


        setMessage("");
        setSuccessful(false);



        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

            AuthService.register(name, email, password, is_mod,Is_admin).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    console.log(is_mod);
                    navigate('/login',{replace:true})
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="col-md-12 center-login">
            <div className="card card-container">
                <div className="Title"> <h3>Register and post advertisements</h3> </div>

                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChangename}
                                    validations={[required, vname]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
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
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group mt-4 text-center">
                                <button className="button-prim-1-pages">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
            <div className="link-signup-3">
                <Link to="/register">Just want to apply to job's advertisements ?</Link>
            </div>
            <div className="link-signup-2">
                <Link to="/login">already an account ?</Link>
            </div>
        </div>
    );
};
export default RegisterMod;

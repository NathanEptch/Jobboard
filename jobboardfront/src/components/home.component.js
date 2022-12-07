import React, { useState, useEffect } from "react";

import UserService from "../service/user.service";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from "../service/auth.service";
import {faBriefcase,faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);


    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);


        }
    }, []);

    return (
        <div>
            <div id="img">
                <h1>Find the best oppotunities on <span className="logo">Urjob</span></h1>
            </div>
            <main className="container">
                <div className="mid">
                    <button className="button-prim-1"> <Link to={"/register"} className="nav-link">
                        Check my next job !
                    </Link>
                    </button>
                    <button className="button-prim-2"> <Link to={"/register-mod"} className="nav-link">
                        Post an Advertisement
                    </Link></button>
                </div>
                <div className="intro">
                    <div className="Part">
                        <div className="home-icon"><FontAwesomeIcon  size="8x" icon={faBriefcase}/></div>

                        <div><p><span className="logo">UrJob </span>  Is the perfect app for finding job in the web. With all our partners, we offer you thousands of job advertisements in differents fields, with new ones everydays !</p></div>
                    </div>
                    <div className="Part">
                        <div className="home-p"><p> Post you re own advertisement in less than 2 minutes and get instant applications !</p>
                            <button className="button-prim-2 mt-5   "> <Link to={"/register-mod"} className="nav-link">
                                Create a company account
                            </Link></button>
                        </div>
                        <div className="home-icon"><FontAwesomeIcon  size="8x" icon={faPaperPlane}/></div>


                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from "react";
import AdvertisementService from "../service/advertisement.service";

const BoardAdmin = () => {
    const [Applications, setApplications] = useState([]);
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        GetApplication();
        GetUser();
    }, []);

    function GetApplication() {
        AdvertisementService.getApAll()
            .then((response) => {
                setApplications(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function GetUser() {
        AdvertisementService.getUserAll()
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div>
            <div id="big-contain" className="container mt-3">
                <div id="big-contain">
                    <h2>Applications</h2>
                    <ul className="list-group">
                        {Applications &&
                            Applications.map((Applications) => (
                                <li key={Applications.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <h3 className="card-title">{Applications.job}</h3>
                                                <button className="btn-sec">
                                                    {" "}
                                                    <p>{Applications.createdAt.substring(0, 10)}</p>
                                                </button>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between mt-1">
                                                <h5 className="card-title">{Applications.name}</h5>
                                                <span className="card-text">
                          <a
                              className="link-email"
                              href={"mailto:" + Applications.email}
                          >
                            {Applications.email}
                          </a>
                        </span>
                                            </div>

                                            <p className="card-text mt-3">{Applications.message}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div id="big-contain" className="container mt-3">
                <div id="big-contain">
                    <h2>User</h2>
                    <ul className="list-group">
                        {Users &&
                            Users.map((Users) => (
                                <li key={Users.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <h3 className="card-title">{Users.last_name}</h3>
                                                <button className="btn-sec">
                                                    {" "}
                                                    <p>{Users.createdAt.substring(0, 10)}</p>
                                                </button>
                                            </div>
                                            <h5 className="card-title">{Users.email}</h5>
                                            <h5 className="card-title">{Users.is_mod}</h5>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BoardAdmin;
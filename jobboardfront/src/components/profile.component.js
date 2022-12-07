import React, {useState,useEffect} from "react";
import AuthService from "../service/auth.service";
import AdvertisementService from "../service/advertisement.service";

const Profile = () => {
    const [ApplicationsMod,setApplicationsMod] = useState([])
    const [Applications,setApplications] = useState([])

    const currentUser = AuthService.getCurrentUser();
    const ID_User = currentUser.id

    useEffect(() => {

        GetApplication()
    }, []);

    function GetApplication(){
        AdvertisementService.getApMod(ID_User)
            .then(response => {
                setApplicationsMod(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        AdvertisementService.getApUser(ID_User)
            .then(response => {
                setApplications(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div id="big-contain" className="container mt-3">
            <header className="jumbotron">
                <h2>
                    {currentUser.name} Profile
                </h2>
            </header>
            {/*<p>*/}
            {/*    <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}*/}
            {/*    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
            {/*</p>*/}
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>

                {currentUser && (
                    <li>
                        <span>User</span>
                    </li>
                )}
                {currentUser.is_mod && (
                    <li>
                        <span>Mod</span>
                    </li>
                )}
                {currentUser.Is_admin && (
                    <li>
                        <span>admin</span>
                    </li>
                )}

            </ul>


            {/*<ul>*/}
            {/*    {currentUser.roles &&*/}
            {/*        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
            {/*</ul>*/}


            {currentUser.is_mod && (
                <div id="big-contain">
                    <h3>Applications to my Ads</h3>
                    <ul className="list-group">
                        {ApplicationsMod &&
                            ApplicationsMod.map((ApplicationsMod) => (

                                <li

                                    key={ApplicationsMod.id}
                                >
                                    <div className="card">

                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <h3 className="card-title">{ApplicationsMod.job}</h3>
                                                <button className="btn-sec"> <p>{ApplicationsMod.createdAt.substring(0,10)}</p>
                                                </button>
                                            </div>

                                            <div className="d-flex flex-row justify-content-between mt-1">

                                                <h5 className="card-title">{ApplicationsMod.name}</h5>
                                                <span className="card-text"><a className="link-email" href={'mailto:'+ApplicationsMod.email}>{ApplicationsMod.email}</a></span>
                                            </div>

                                            <p className="card-text mt-3">{ApplicationsMod.message}</p>
                                        </div>
                                    </div>
                                </li>

                            ))}
                    </ul>
                </div>
            )}

            {currentUser &&(
                <div>
                    <h3 >My applications</h3>
                    <ul className="list-group">
                        {Applications &&
                            Applications.map((Applications) => (

                                <li

                                    key={Applications.id}
                                >
                                    <div className="card">

                                        <div className="card-body">
                                            <div>
                                                <h3 className="card-title">{Applications.job}</h3>
                                                <button className="btn-sec"> <p>{Applications.createdAt.substring(0,10)}</p>
                                                </button>
                                            </div>
                                            <p className="card-text mt-3">{Applications.message}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
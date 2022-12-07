import React, { useState,useEffect } from "react";
import AuthService from "../service/auth.service";
import AdvertisementService from "../service/advertisement.service";
import {Link, Route, Routes} from "react-router-dom";

import AdvertisementDataService from "../service/advertisement.service";



function BoardMod (){

    let [advertisements, setAdvertisements] = useState([])
    let [currentadvertisement, setCurrentadvertisement]= useState(null);
    let [Title, setSearchTitle]= useState("");
    let [advertisementsMod, setAdvertisementsMod] = useState([])

    useEffect(() => {

        GetAdvertisementsMod()

    },[]);

    const user = AuthService.getCurrentUser();

    function GetAdvertisementsMod(){
        AdvertisementService.GetAd(user.id)
            .then(response => {
                setAdvertisementsMod(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }






    function refreshList() {
        GetAdvertisementsMod();
        setCurrentadvertisement(null);
    }


    // function setActiveadvertisement(advertisement, index) {
    //     setCurrentadvertisement(advertisement);}

    function removeAlladvertisements(){
        AdvertisementDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }


    function searchTitle() {
        AdvertisementDataService.findByTitle(setSearchTitle(Title))
            .then(response => {
                setAdvertisements(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }





    return (
        <div id="big-contain" className="container row m-auto">
            <div className="col-md-8">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <h2>advertisements List</h2>
                    <Link className="button-prim-2 mx-5"
                          to={"/add-advertisement/"}
                    >
                        Add Ad
                    </Link>
                </div>
            </div>
            <div className="col-md-5 mt-5" id="Ad-list">


                <ul className="list-group">
                    {advertisementsMod &&
                        advertisementsMod.map((advertisementsMod, index) => (
                            <li

                                onClick={() => setCurrentadvertisement(advertisementsMod)}
                                key={advertisementsMod.id}
                            >

                                <div className="card mt-1">

                                    <div className="card-body">
                                        <h3 className="card-title">  {advertisementsMod.job}
                                        </h3>
                                        {advertisementsMod.company && (
                                            <div className="card-sous-titre">
                                                <h4>{advertisementsMod.company}</h4>

                                            </div>
                                        )}
                                        <div className="info-supp">
                                            {advertisementsMod.place && (
                                                <button className="btn-sec">
                                                    <p>{advertisementsMod.place}</p>
                                                </button>
                                            )}

                                            {advertisementsMod.salaire &&(
                                                <button className="btn-sec">
                                                    <p>{advertisementsMod.salaire} k</p>
                                                </button>
                                            )}
                                            {advertisementsMod.experience &&(
                                                <button className="btn-sec">
                                                    <p>{advertisementsMod.experience} years of experience</p>
                                                </button>
                                            )}

                                        </div>
                                        <p className="card-text mt-4">{advertisementsMod.description_adv.substring(1,50)}...</p>
                                    </div>
                                </div>
                            </li>

                        ))}
                </ul>
            </div>
            <div className="col-md-7 mt-4" >
                {currentadvertisement ? (
                    <div className="fixed-card">
                        <div className="card">
                            <div>
                                <h3 className="card-title">{currentadvertisement.job}
                                </h3>
                            </div>
                            {currentadvertisement.company && (
                                <div className="card-sous-titre">
                                    <h4>{currentadvertisement.company}</h4>

                                </div>
                            )}
                            <div className="info-supp">
                                {currentadvertisement.place && (
                                    <button className="btn-sec">
                                        <p>{currentadvertisement.place}</p>
                                    </button>
                                )}

                                {currentadvertisement.salaire &&(
                                    <button className="btn-sec">
                                        <p>{currentadvertisement.salaire} k</p>
                                    </button>
                                )}
                                {currentadvertisement.experience &&(
                                    <button className="btn-sec">
                                        <p>{currentadvertisement.experience} years of experience</p>
                                    </button>
                                )}
                            </div>
                            <p className="card-text mt-4">{currentadvertisement.description_adv}</p>


                            <div className="d-flex flex-row justify-content-between mt-5">




                                    <button id="button-apply" className="button-prim-2"> <Link  to={"/advertisement/" + currentadvertisement.id}>

                                        Edit
                                    </Link>
                                    </button>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a advertisement...</p>
                    </div>
                )}
            </div>

        </div>

    );
};
export default BoardMod;


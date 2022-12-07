import React, { useState,useEffect } from "react";
import AdvertisementDataService from "../service/advertisement.service";
import {Link, Route, Routes} from "react-router-dom";
import Modal from "react-modal";
import MyModalComponent from "./modal-apply";
import Login from "./Users/login.component";
import Register from "./Users/register.component";
import AuthService from "../service/auth.service";






function AdsList (){

      let [advertisements, setAdvertisements] = useState([])
    let [currentadvertisement, setCurrentadvertisement]= useState({
        id:0,
        job:"",
        ID_people:"",

    });
    let [Title, setSearchTitle]= useState("");
    const [currentUserisMod, setCurrentUserMod] = useState(false);
    const  [currentUserisAdmin, setCurrentUserAdmin]= useState(false)
    const [currentUser, setCurrentUser] = useState(undefined);




    useEffect(() => {

            retrieveadvertisements()

        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            if(user.is_mod){
                setCurrentUserMod(true)
            }
            if(user.Is_admin){
                setCurrentUserAdmin(true)
            }
        }


      }, []);

    const onChangeSearchTitle = e=>{
        let searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

   async function retrieveadvertisements(){
        AdvertisementDataService.getAll()
            .then(response => {
                setAdvertisements(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }



    function refreshList() {
        retrieveadvertisements()
        setCurrentadvertisement(null);
    }


    // function setActiveadvertisement(advertisement) {
    //     setCurrentadvertisement(advertisement);
    //     console.log(currentadvertisement)
    //     Data();
    //
//     // }
//
// function removeAlladvertisements(){
//     AdvertisementDataService.deleteAll()
//         .then(response => {
//             console.log(response.data);
//             refreshList();
//         })
//         .catch(e => {
//             console.log(e);
//         });
//     }

//
//     function searchTitle() {
//         AdvertisementDataService.findByTitle(setSearchTitle(Title))
//             .then(response => {
//                 setAdvertisements(response.data)
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
// }


/////MODAL /////


      const [modalIsOpen, setIsOpen] = React.useState(false);
      const [modaldeconnexion, setConnexionIsOpen] = React.useState(false);


    function openFromParent() {
          if (currentUser) {
              setIsOpen(true);
              console.log(currentadvertisement)
          }
          else{
              setConnexionIsOpen(true)
          }
          setCurrentadvertisement(currentadvertisement)
            console.log(currentadvertisement)
      }

      function handleCloseModal(event, data) {
          console.log(event, data);
          setIsOpen(false);
      }

      function handleCloseModalConnexion(event) {
          console.log(event);
          setConnexionIsOpen(false);
      }

      function handleAfterOpen(event, data) {

          console.log(event, data);

      }
    const customStylesCon = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: '70%',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };
    const styleforbutton ={
        content:{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'center'
        }
    };

        return (
            <div id="big-contain" className="container">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <h2>advertisements List</h2>
                </div>

            <div className="row">


                <div className="col-md-5">
                         <ul className="list-group">
                                {advertisements &&
                                    advertisements.map((advertisement) => (

                                        <li
                                            className={

                                                (advertisement.id === currentadvertisement.id ? "active" : "")
                                            }
                                            onClick={() => setCurrentadvertisement(advertisement)}
                                            key={advertisement.id}
                                        >

                                            <div className="card">
                                                <div className="card-body">
                                                    <h3 className="card-title">  {advertisement.job}
                                                    </h3>
                                                    {advertisement.company && (
                                                        <div className="card-sous-titre">
                                                            <h4>{advertisement.company}</h4>

                                                        </div>
                                                    )}

                                                    <div className="info-supp">
                                                        {advertisement.place && (
                                                            <button className="btn-sec">
                                                                <p>{advertisement.place}</p>
                                                            </button>
                                                        )}

                                                        {advertisement.salaire &&(
                                                        <button className="btn-sec">
                                                            <p>{advertisement.salaire} k</p>
                                                        </button>
                                                            )}
                                                        {advertisement.experience &&(
                                                            <button className="btn-sec">
                                                                <p>{advertisement.experience} years of experience</p>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="card-text mt-4">{advertisement.description_adv.substring(1,50)}...</p>
                                                </div>
                                            </div>
                                        </li>

                                    ))}
                            </ul>
                        </div>
                        <div className="col-md-7 " >
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



                                    {currentadvertisement.job&&(


                                        <button onClick={openFromParent} id="button-apply" className="button-prim-1">
                                        Apply</button>
                                    )}
                                        {currentUserisAdmin && currentadvertisement.job && (
                                            <button id="button-apply" className="button-prim-2"> <Link  to={"/advertisement/" + currentadvertisement.id}>

                                                Edit
                                            </Link>
                                            </button>
                                        )}
                                    </div>

                                    <Modal
                                        isOpen={modaldeconnexion}
                                        style={customStylesCon}
                                        ariaHideApp={false}

                                    >
                                        <p>Vous devez vous connecter ou créer un compte pour Postuler</p>
                                        <div className="d-flex flex-row justify-content-between"

                                        >
                                        <button className="btn btn-secondary">
                                            <Link to={"/login"} className="nav-link">
                                                Login
                                            </Link>
                                        </button>
                                            <button className="btn btn-secondary">
                                                <Link to={"/register"} className="nav-link">
                                                    Sign Up
                                                </Link>
                                            </button>

                                        <button className="btn btn-secondary" onClick={e => handleCloseModalConnexion(e)}>close</button>
                                        </div>

                                    </Modal>
                                </div>
                                    </div>
                            ) : (
                                <div>
                                    <br/>
                                    <p>Please click on a advertisement...</p>
                                </div>
                            )}
            </div>
                <MyModalComponent
                    dynData={currentadvertisement}
                    IsModalOpened={modalIsOpen}
                    onCloseModal={handleCloseModal}
                    onAfterOpen={handleAfterOpen}
                />
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </div>
            </div>

        );
};
export default AdsList;

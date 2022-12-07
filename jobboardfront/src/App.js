import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap.css"
import './App.css';
import React, {useEffect,useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Advertisement from "./components/advertisement";
import AdsList from "./components/advertisements-list.component";
import AddAdvertisement from "./components/add-advertisement.component"

import AuthService from "./service/auth.service";
import Login from "./components/Users/login.component";
import Register from "./components/Users/register.component";
import RegisterMod from './components/Users/Mod-register.component'
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardMod from "./components/board-mod.component";
import BoardAdmin from "./components/board-admin.component";

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserisMod, setCurrentUserMod] = useState(false);
  const [currentUserisadmin, setCurrentAdmin] = useState(false);


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      if(user.is_mod){
        setCurrentUserMod(true)
      }
      if(user.Is_admin){
        setCurrentAdmin(true)
      }
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
      <div>
        <nav className="navbar navbar-expand">
          <Link to={"/"} className="logo-nav nav-link">
            UrJob
          </Link>
          <div className="nav2">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/advertisements"} className="nav-link">
                  Jobs
              </Link>

            </li>

            {currentUserisMod && (
                <li className="nav-item">
                  <Link
                      to={"/mod/" + currentUser.id}
                      className="nav-link"
                  >
                    Mes annonces
                  </Link>

                </li>
            )}

            {currentUserisadmin && (
                <li className="nav-item">

                  <Link to={"/admin"} className="nav-link">
                    Admin
                  </Link>
                </li>
            )}


          </div>


          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register-mod"} className="nav-link">
                    Add a Job
                  </Link>
                </li>
              </div>


          )}
          </div>

        </nav>



        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/advertisements" element={<AdsList/>} />
            <Route path="/add-advertisement" element={<AddAdvertisement/>} />

            <Route path="/advertisement/:id" element={<Advertisement/>} />

            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/register-mod" element={<RegisterMod/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/user" element={<BoardUser/>} />
            <Route path="/mod/:id" element={<BoardMod/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
          </Routes>
        </div>


        <footer className="page-footer pt-4">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="">About us</h5>
                <p>This website has been created for educational purpose. It doesnt contains real job Advertisement, we created it using Node.js, React and MariaDB</p>
              </div>

              <hr className="clearfix w-100 d-md-none pb-0"/>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="">User</h5>
                <ul className="list-unstyled">
                  <li><Link to={'/register-mod'}>Create a Companie account</Link> </li>
                  <li><Link to={'/register'}>Create a basic user account</Link> </li>
                  <li><Link to={'/login'}>Login</Link></li>
                </ul>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="">Useful Links</h5>
                <ul className="list-unstyled">
                  <li><Link to={'/'}>Home</Link> </li>
                  <li><Link to={'/advertisements'}>Advertisements</Link> </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-copyright text-center py-3">© 2022 Copyright
          </div>

        </footer>


      </div>
  );
};

export default App;
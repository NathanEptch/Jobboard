import React, {useState,useEffect,} from "react";
import AdvertisementDataService from "../service/advertisement.service";
import { withRouter } from '../common/with-router';
import { useNavigate,useParams} from "react-router-dom";
import AuthService from "../service/auth.service";


function Advertisement() {
    let [ide, setId] = useState(null)
    let [job, setJob] = useState("");
    let [description_adv, setdescription_adv] = useState("");
    const currentUser = AuthService.getCurrentUser();
    const ID_User = currentUser.id

    let [message, setMessage] = useState("");
    let [currentadvertisement, setcurrentadvertisement] = useState({
        job: "",
        id: null,

        description_adv: "",
        experience:0,
        place:"",
        salaire:0
    })




    const params = useParams();
    let navigate = useNavigate();


    useEffect(() => {


        Getadvertisement(params.id)
    },[]);


    function OnChangeTitle(e) {
        const job = e.target.value;
        setJob(job);
        setcurrentadvertisement({
            id:currentadvertisement.id,
            job:job,
            description_adv:currentadvertisement.description_adv,
            experience:currentadvertisement.experience,
            place:currentadvertisement.place,
            salaire: currentadvertisement.salaire
        })


    }

    function OnChangeDescription(e) {
        const description_adv = e.target.value;
        setdescription_adv(description_adv);
        setcurrentadvertisement({
            id:currentadvertisement.id,
            job:currentadvertisement.job,
            description_adv:description_adv,
            experience:currentadvertisement.experience,
            place:currentadvertisement.place,
            salaire: currentadvertisement.salaire
        })
    }
    function OnchangeExp(e) {
        const experience = e.target.value;
        setcurrentadvertisement({
            id:currentadvertisement.id,
            job:currentadvertisement.job,
            description_adv:currentadvertisement.description_adv,
            experience:experience,
            place:currentadvertisement.place,
            salaire: currentadvertisement.salaire
        })
    }
    function Onchangeplace(e) {
        const place = e.target.value;
        setcurrentadvertisement({
            id:currentadvertisement.id,
            job:currentadvertisement.job,
            description_adv:currentadvertisement.description_adv,
            experience:currentadvertisement.experience,
            place:place,
            salaire:currentadvertisement.salaire
        })
    }
    function Onchangesalaire(e) {
        const salaire = e.target.value;
        setcurrentadvertisement({
            id:currentadvertisement.id,
            job:currentadvertisement.job,
            description_adv:currentadvertisement.description_adv,
            experience:currentadvertisement.experience,
            place:currentadvertisement.place,
            salaire: salaire
        })
    }

    function Getadvertisement(id) {
        AdvertisementDataService.get(id)
            .then(response => {
                setcurrentadvertisement(response.data)
                setId(currentadvertisement.id)
                console.log(response.data);
                console.log(id)

            })
            .catch(e => {
                console.log(e);
            });

    }

    function Updateadvertisement(ide) {
        var data ={
            id:currentadvertisement.id,
            job:currentadvertisement.job,
            description_adv:currentadvertisement.description_adv,
            experience:currentadvertisement.experience,
            place:currentadvertisement.place,
            salaire:currentadvertisement.salaire
        }
        console.log(currentadvertisement)
        AdvertisementDataService.update(currentadvertisement.id, data)
            .then(response =>{
            console.log(response.data)
            setMessage("The tutorial was updated successfully!")
                navigate(`/mod/:id`, { replace: true });

            })
            .catch(e=>{
                console.log(e)
            })
        console.log(currentadvertisement)


    }
    function Deleteadvertisement(){
        AdvertisementDataService.delete(
            currentadvertisement.id
        )
            .then(response=>{
                console.log(response.data)
                navigate("/advertisements", { replace: true });
            })
            .catch(e=>{
                console.log(e)
            })
    }




    return (
        <div>

            {currentadvertisement ? (
                <div className="edit-form card-container" id="big-contain">
                    <h3>Edit {currentadvertisement.job}</h3>
                    <form className="mb-5">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentadvertisement.job}
                                onChange={OnChangeTitle}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                className="form-control h-100"
                                id="description"
                                value={currentadvertisement.description_adv}
                                onChange={OnChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="experience">Experience</label>
                            <input
                                type="number"
                                className="form-control"
                                id="experience"
                                value={currentadvertisement.experience || 0}
                                onChange={OnchangeExp}
                                placeholder="5"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Place">Place</label>
                            <input
                                type="text"
                                className="form-control"
                                id="place"
                                value={currentadvertisement.place || ""}
                                onChange={Onchangeplace}
                                placeholder="Paris"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salaire">Annual salary</label>
                            <input
                                type="number"
                                className="form-control"
                                id="salaire"
                                value={currentadvertisement.salaire || 0}
                                onChange={Onchangesalaire}
                                placeholder="50 the thousand will be add automaticaly"
                            />
                        </div>
                    </form>

                    <button
                        className="button-prim-delete"
                        onClick={Deleteadvertisement}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="button-prim-1"
                        onClick={Updateadvertisement}
                    >
                        Update
                    </button>

                    <p>{message}</p>
                </div>

            ) : (
                <div>
                    <br/>
                    <p>Please click on a advertisement...</p>
                </div>
            )}

        </div>


    );

}


export default withRouter(Advertisement);

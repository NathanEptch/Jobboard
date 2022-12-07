import React, {useEffect, useState} from "react";
import TutorialDataService from "../service/advertisement.service";
import { useNavigate} from "react-router-dom";
import AuthService from "../service/auth.service";
function AddAdvertisement(props)
{
    let [job, setTitle] = useState("");
    let [description_adv, setDescription] = useState("");
    let [experience, setExp] = useState(0);
    let [place, setPlace] = useState("");
    let [salaire, setSalaire] = useState(null);
    let [ID_people, setID_people] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [company, setcompany] = useState("")


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setID_people(user.id)
    }, []);

    let navigate = useNavigate();

    const onChangeTitle = e => {
        setTitle(e.target.value);
    }
    const onChangeDescription = e => {
        setDescription(e.target.value);
    }
    const onChangeExp = e => {
        setExp(e.target.value);
    }
    const onChangePlace = e => {
        setPlace(e.target.value);
    }
    const onChangeSalaire = e => {
        setSalaire(e.target.value);
    }
    const onChangeCompany = e => {
        setcompany(e.target.value);
    }
    function saveTutorial() {

        var data = {
            job,
            description_adv,
            experience,
            place,
            salaire,
            ID_people,
            company
        };

        console.log(data)

        TutorialDataService.create(data)
            .then(response => {
                console.log(response);
                navigate("../advertisements", { replace: true });

            })

            .catch(e => {
                console.log(e);
            });

    }


    return(
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        required
                        value={company || ""}
                        onChange={onChangeCompany}
                        name="company"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="job">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="job"
                        required
                        value={job || ""}
                        onChange={onChangeTitle}
                        name="job"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description_adv">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description_adv"
                        required
                        value={description_adv || ""}
                        onChange={onChangeDescription}
                        name="description_adv"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exp">Experience Requise</label>
                    <input
                        type="number"
                        className="form-control"
                        id="exp"
                        required
                        value={experience || 0}
                        onChange={onChangeExp}
                        name="exp"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="place">Lieu de travail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="place"
                        required
                        value={place || ""}
                        onChange={onChangePlace}
                        name="place"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salaire">Salaire annuel</label>
                    <input
                        type="number"
                        className="form-control"
                        id="salaire"
                        required
                        value={salaire || 0}
                        onChange={onChangeSalaire}
                        name="salaire"
                    />
                </div>

                <button onClick={saveTutorial} className="btn btn-success">
                    Submit
                </button>
            </div>

        </div>
    );
};

export default AddAdvertisement;
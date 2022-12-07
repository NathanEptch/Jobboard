import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import TutorialDataService from "../service/advertisement.service";
import {useNavigate} from "react-router-dom";
import AuthService from "../service/auth.service";



const customStyles = {
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
function MyModalComponent(props) {
        let [name, setName] = useState("");
        let [email, setEmail] = useState("");
        let [message, setMessage] = useState(0);
        const [currentUser, setCurrentUser] = useState(undefined);

    let navigate = useNavigate();

        const OnchangeName = e => {
            setName(e.target.value);
        }
        const OnchangeEmail = e => {
            setEmail(e.target.value);
        }
        const OnchangeMessage = e => {
            setMessage(e.target.value);
        }
    function afterOpenModal(e) {
        props.onAfterOpen(e, 'After Modal Opened');
        const user = AuthService.getCurrentUser();


        if (user) {
            setCurrentUser(user);
        }
        console.log(user.id)



    }



    function onModalClose(event) {
        let data = {name: 'example', type: 'closed from child'};
        props.onCloseModal(event, data);
    }

    function SaveApplication() {
        const job = props.dynData.job
        const ID_people = props.dynData.ID_people
        const ID_ad = props.dynData.id
        const ID_user = currentUser.id
        console.log(ID_user)
        const data = {
            name,
            email,
            message,
            ID_user,
            job,
            ID_people,
            ID_ad
        };

        TutorialDataService.createApp(data)
            .then(response => {
                console.log(response);
                navigate("../advertisements", { replace: true });
                onModalClose()
            })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <div>
            <Modal
                isOpen={props.IsModalOpened}
                onAfterOpen={e => afterOpenModal(e)}
                style={customStyles}
                ariaHideApp={false}
            >
                {/*<h2>{props.dynData.title}</h2>*/}
                <button onClick={e => onModalClose(e)}>close</button>
                <div>
                    <form action="">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={OnchangeName}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={OnchangeEmail}
                        />
                        <label htmlFor="Message">Message</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="Message"
                            value={message}
                            onChange={OnchangeMessage}
                        />
                    </form>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={SaveApplication}
                    >
                        Send
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default MyModalComponent;

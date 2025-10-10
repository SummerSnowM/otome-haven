import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useContext } from 'react';

import { AuthContext } from '../AuthProvider';
import { useDispatch } from 'react-redux';
import { saveGame } from '../../features/usersSlice';
import axios from 'axios';
import { BASE_URL } from '../../App';

import Notification from '../Notification';

export default function AddGame({ showModal, closeModal }) {
    const [name, setName] = useState("");
    const [developer, setDeveloper] = useState("");
    const [genre, setGenre] = useState("");
    const [platform, setPlatform] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [rating, setRating] = useState(0);
    const [file, setFile] = useState(null);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = () => {
        //upload image to firebase storage
        dispatch(saveGame({ userId: currentUser?.uid, file }))

        //post data to neon console
        const data = {
            name,
            developer,
            genre,
            platform,
            synopsis,
            rating
        }

        axios.post(`${BASE_URL}/games/${currentUser?.uid}`, data)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        //reset values
        setName("");
        setDeveloper("");
        setGenre("");
        setPlatform("");
        setSynopsis("");
        setRating(0);
        setFile(null);

        //close modal
        closeModal();
        
        //open notification
        handleOpenToast();
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={closeModal}
                animation={true}
                centered
            >
                <Modal.Header style={{ backgroundColor: '#E6B2BA' }} closeButton>
                    <Modal.Title>New Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <Form.Group>
                            <Form.Label>Game Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Developer</Form.Label>
                            <Form.Control
                                type='text'
                                value={developer}
                                onChange={e => setDeveloper(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type='text'
                                value={genre}
                                onChange={e => setGenre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Platform</Form.Label>
                            <Form.Select value={platform} onChange={e => setPlatform(e.target.value)} required>
                                <option selected></option>
                                <option value='Playstation 5'>Playstation 5</option>
                                <option value='Playstation 4'>Playstation 4</option>
                                <option value='Nintendo Switch'>Nintendo Switch</option>
                                <option value='PC'>PC</option>
                                <option value='PS Vita'>PS Vita</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Synopsis</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                value={synopsis}
                                onChange={e => setSynopsis(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type='number'
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                min={0.5}
                                max={5}
                                step={0.5}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Game Profile Image</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={e => setFile(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Button className='w-100 mt-3 rounded-5' type='submit' style={{ backgroundColor: '#E6B2BA', border: 'transparent', color: 'white' }}>Add Game</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification showToast={showToast} message={message} closeToast={handleCloseToast}/>
        </>
    )
}
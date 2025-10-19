import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'

import { saveCharacter } from '../../features/usersSlice';
import { BASE_URL } from '../../App';

import Notification from '../Notification';

export default function AddCharacter({ showModal, closeModal, imageId, gameId, userId, setLoading }) {
    const [name, setName] = useState("");
    const [voiceActor, setVoiceActor] = useState("");
    const [personality, setPersonality] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [file, setFile] = useState(null);
    const [cgs, setCgs] = useState(null);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = async () => {


        //upload data to neon console
        const data = {
            name,
            voice_actor: voiceActor,
            personality,
            review,
            rating,
        }

        const firebaseData = {
            name,
            file,
            cgs
        }

        //reset values
        setName("");
        setVoiceActor("");
        setPersonality("");
        setReview("");
        setRating(0);
        setFile(null);
        setCgs(null);

        //close the form
        closeModal();

        try {
            const response = await axios.post(`${BASE_URL}/characters/${gameId}`, data);
            setMessage(response.data.message);

            if (response.data.status === 'success') {
                dispatch(saveCharacter({ userId, gameId: imageId, name: firebaseData.name, file: firebaseData.file, cgs: firebaseData.cgs }));
            }
            //open notification
            handleOpenToast();

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(true);
        }
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
                    <Modal.Title>New Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <Form.Group>
                            <Form.Label htmlFor="charName">Character Name</Form.Label>
                            <Form.Control
                                id="charName"
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label htmlFor="voiceActor">Voice Actor</Form.Label>
                            <Form.Control
                                id="voiceActor"
                                type='text'
                                value={voiceActor}
                                onChange={e => setVoiceActor(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="personality">Personality</Form.Label>
                            <Form.Control
                                id="personality"
                                type='text'
                                value={personality}
                                onChange={e => setPersonality(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label htmlFor="review">Your Review / Opinion:</Form.Label>
                            <Form.Control
                                id="review"
                                as='textarea'
                                rows={5}
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="rating">Rating</Form.Label>
                            <Form.Control
                                id="rating"
                                type='number'
                                max={5}
                                min={1}
                                step={0.1}
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Character Profile Image</Form.Label>
                            <Form.Control
                                accept='.jpg, .jpeg, .png'
                                type='file'
                                onChange={e => setFile(e.target.files[0])}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Favorite Cgs</Form.Label>
                            <Form.Control
                                accept='.jpg, .jpeg, .png'
                                type='file'
                                onChange={e => setCgs(e.target.files)}
                                multiple
                            />
                        </Form.Group>
                        <Button className='w-100 mt-3 rounded-5' style={{ backgroundColor: '#E6B2BA', border: 'transparent', color: 'white' }} type='submit'>Add Character</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>
    )
}
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { BASE_URL } from '../../App';
import axios from 'axios';

import Notification from '../Notification';

export default function UpdateCharacter({ showModal, closeModal, character, setLoading }) {
    const [voiceActor, setVoiceActor] = useState(character.voice_actor);
    const [personality, setPersonality] = useState(character.personality);
    const [review, setReview] = useState(character.review);
    const [rating, setRating] = useState(character.rating);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = () => {
        const data = {
            voice_actor: voiceActor,
            personality,
            review,
            rating
        }
        axios.put(`${BASE_URL}/characters/${character.id}`, data)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error))
            .finally(() => setLoading(true));

        //close modal
        closeModal();

        //show toast
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
                    <Modal.Title>Update Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <Form.Group >
                            <Form.Label>Voice Actor</Form.Label>
                            <Form.Control
                                type='text'
                                value={voiceActor}
                                onChange={e => setVoiceActor(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Personality</Form.Label>
                            <Form.Control
                                type='text'
                                value={personality}
                                onChange={e => setPersonality(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Your Review / Opinion:</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={5}
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type='number'
                                max={5}
                                min={1}
                                step={0.1}
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className='w-100 mt-3 rounded-5' style={{ backgroundColor: '#E6B2BA', border: 'transparent', color: 'white' }} type='submit'>Update Character</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>
    )
}
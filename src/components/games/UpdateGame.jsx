import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../../App';

import Notification from '../Notification';

export default function UpdateGame({ game, showModal, closeModal, setLoading }) {
    const [developer, setDeveloper] = useState(game.developer);
    const [genre, setGenre] = useState(game.genre);
    const [platform, setPlatform] = useState(game.platform);
    const [synopsis, setSynopsis] = useState(game.synopsis);
    const [rating, setRating] = useState(game.rating);

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleSubmit = () => {
        const data = {
            developer,
            genre,
            platform,
            synopsis,
            rating
        }

        axios.put(`${BASE_URL}/games/${game.id}`, data)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error))
            .finally(() => setLoading(true));

        closeModal();
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
                    <Modal.Title>Update Game Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
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
                                step={0.1}
                                required
                            />
                        </Form.Group>

                        <Button type='submit' className='w-100 mt-3' style={{ backgroundColor: '#E6B2BA', border: 'transparent', color: 'white' }}>Update Game</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>
    )
}
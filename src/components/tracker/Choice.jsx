import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import { BASE_URL } from '../../App';
import axios from 'axios';
import Notification from '../Notification';

export default function Choice({ charId, showModal, closeModal, isNewChap, choice, chap }) {
    const [chapter, setChapter] = useState(0);
    const [description, setDescription] = useState("");

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleSubmitChapter = () => {
        const data = {
            chapter,
            description
        }

        axios.post(`${BASE_URL}/chapter/${charId}`, data)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        //reset values
        setChapter(0);
        setDescription("");

        //close modal
        closeModal();

        //open toast
        handleOpenToast();
    }

    const handleSubmitDescription = () => {
        const data = {
            description,
            chapter: chap
        }
        axios.post(`${BASE_URL}/chapter/description/${charId}`, data)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        //reset value
        setDescription("");

        //close modal
        closeModal();

        //open toast
        handleOpenToast();
    }

    const handleUpdateDescription = () => {
        axios.put(`${BASE_URL}/chapter/description/${choice}`, {description})
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        //reset value
        setDescription("");

        //close modal
        closeModal();

        //open toast
        handleOpenToast();
    }

    return (
        <>
            <Modal
                show={showModal}
                animation={true}
                onHide={closeModal}
                centered
            >
                <Modal.Header style={{ backgroundColor: '#E6B2BA' }} closeButton>
                    <Modal.Title>{isNewChap ? 'Add New Chapter' : choice != 0 ? 'Update Description' : 'Add New Description'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        isNewChap ? handleSubmitChapter() : choice != 0 ? handleUpdateDescription() : handleSubmitDescription();
                    }}>
                        {isNewChap && (
                            <Form.Group>
                                <Form.Label>Chapter</Form.Label>
                                <Form.Control
                                    type='number'
                                    min={1}
                                    value={chapter}
                                    onChange={e => setChapter(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        )}

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type='submit' className='mt-3' style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>{isNewChap ? 'Add Chapter' : choice != 0 ? 'Update Description' : 'Add Description'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>

    )
}
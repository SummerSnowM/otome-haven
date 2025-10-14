import { Card, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { BASE_URL } from '../../App';
import { deleteGame } from '../../features/usersSlice';

import UpdateGame from './UpdateGame';
import Notification from '../Notification';

export default function GameCard({ userId, imageId, game, imageUrl, setLoading }) {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleDelete = () => {
        //delete game from neon console
        axios.delete(`${BASE_URL}/games/${game.id}`)
            .then((response) => setMessage(response.data.message))
            .then(() => dispatch(deleteGame({ userId, imageId }))) //delete info from firebase db
            .catch((error) => console.error(error))
            .finally(() => setLoading(true));

        handleOpenToast();
    }

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }} className='mt-3'>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Img className='h-100' src={`${imageUrl}`} />
                        </Col>
                        <Col>
                            <Card.Title>{game.name}</Card.Title>
                            <Button onClick={() => navigate(`/characters/${userId}/${game.id}/${imageId}`)} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-people-fill"></i>
                            </Button>
                            <Button onClick={() => handleOpenModal()} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-pencil-fill"></i>
                            </Button>
                            <Button onClick={() => handleDelete()} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-trash3-fill"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <UpdateGame showModal={showModal} game={game} closeModal={handleCloseModal} setLoading={setLoading} />
            <Notification message={message} showToast={showToast} closeToast={handleCloseToast} />
        </>
    )
}
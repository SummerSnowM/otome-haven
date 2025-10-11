import { Card, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { BASE_URL } from '../../App';
import { deleteGame } from '../../features/usersSlice';

import UpdateGame from './UpdateGame';

export default function GameCard({ userId, imageId, game, imageUrl }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        //delete game from neon console
        axios.delete(`${BASE_URL}/games/${game.id}`)
            .then((response) => console.log(response.data.message))
            .catch((error) => console.error(error));

        //delete info from firebase db
        dispatch(deleteGame({ userId, imageId }));
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

            <UpdateGame showModal={showModal} game={game} closeModal={handleCloseModal} />
        </>
    )
}
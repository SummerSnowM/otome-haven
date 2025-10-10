import { Card, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios'
import { BASE_URL } from '../../App';
import { deleteGame } from '../../features/usersSlice';

import Notification from '../Notification';

export default function GameCard({ userId, imageId, game, imageUrl }) {
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = () => {
        //delete info from firebase db
        dispatch(deleteGame({ userId, imageId}));

        //delete game from neon console
        axios.delete(`${BASE_URL}/games/${game.id}`)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        handleOpenToast();
    }

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    return (
        <>
            <Card className='mt-3'>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Img className='h-100' src={`${imageUrl}`} />
                        </Col>
                        <Col>
                            <Card.Title>{game.name}</Card.Title>
                            <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-people-fill"></i>
                            </Button>
                            <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-pencil-fill"></i>
                            </Button>
                            <Button onClick={() => handleDelete()} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-trash3-fill"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>
    )
}
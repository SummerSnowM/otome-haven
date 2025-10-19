import { Container, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { fetchImage } from '../features/usersSlice';
import { BASE_URL } from '../App';
import { AuthContext } from '../components/AuthProvider';
import { Navigate } from 'react-router-dom';

import AddGame from '../components/games/AddGame';
import GameCard from '../components/games/GameCard';

export default function Library() {
    const images = useSelector((state) => state.users.images);

    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (loading) {
            axios.get(`${BASE_URL}/games/${currentUser?.uid}`)
                .then((response) => setGames(response.data.data))
                .then(() => dispatch(fetchImage({ userId: currentUser?.uid })))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [loading, currentUser, dispatch]);

    if (!currentUser) return <Navigate to='/login' replace />
    return (
        <>
            <Container className='mt-4'>
                <Button onClick={handleOpenModal} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>Register New Game</Button>
                <br />
                <Row xs={1} sm={1} md={2} lg={3}>
                    {games ? (
                        games.map((game, index) => {
                            //pinpoint the exact image url for the current game
                            const image = images.find(img => img.name === game.name);
                            return (
                                <Col key={index}>
                                    <GameCard userId={currentUser?.uid} imageId={image?.id} game={game} imageUrl={image?.imageUrl} setLoading={setLoading} />
                                </Col>
                            )
                        })
                    ) : <p className='mt-3'>No games registered yet</p>}
                </Row>
            </Container>

            <AddGame showModal={showModal} closeModal={handleCloseModal} setLoading={setLoading} />
        </>
    )
}
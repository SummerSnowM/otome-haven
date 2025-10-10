import { Container, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { fetchImage } from '../features/usersSlice';
import { BASE_URL } from '../App';
import { AuthContext } from '../components/AuthProvider';

import AddGame from '../components/games/AddGame';
import GameCard from '../components/games/GameCard';

export default function Library() {
    const images = useSelector((state) => state.users.images);
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [games, setGames] = useState([]);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/games/${currentUser?.uid}`)
            .then((response) => setGames(response.data.data))
            .catch((error) => console.error(error));

        dispatch(fetchImage({ userId: currentUser?.uid }))
    }, [games, currentUser, dispatch]);

    return (
        <>
            <Container className='mt-4'>
                <Button onClick={handleOpenModal} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>Register New Game</Button>
                <br />
                <Row xs={1} sm={1} md={2} lg={3}>
                    {games ? (
                        games.map((game, index) => {
                            //pinpoint the exact image url for the current game
                            const image = images.find(img => img.name === game.name)?.imageUrl;
                            return (
                                <Col key={index}>
                                    <GameCard game={game} imageUrl={image} />
                                </Col>
                            )
                        })
                    ) : <p className='mt-3'>No games registered yet</p>}
                </Row>
            </Container>

            <AddGame showModal={showModal} closeModal={handleCloseModal} />
        </>
    )
}
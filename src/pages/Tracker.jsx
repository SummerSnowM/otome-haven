import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { BASE_URL } from "../App";
import { AuthContext } from "../components/AuthProvider";
import { fetchImage } from '../features/usersSlice';
import axios from "axios";

import GameHeader from '../components/memories/GameHeader';

export default function Tracker() {
    const { currentUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const images = useSelector(state => state.users.images);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            axios.get(`${BASE_URL}/games/${currentUser?.uid}`)
                .then((response) => setGames(response.data.data))
                .catch((error) => console.error(error));

            dispatch(fetchImage({ userId: currentUser?.uid }));
            setLoading(false);
        }

    }, [currentUser, dispatch, loading])

    if (!currentUser) return <Navigate to='/login' replace />

    return (
        <>
            <Container className='mt-4'>
                <h1 className='text-center' style={{ color: '#E6B2BA' }}>Endings Tracker</h1>
                {!loading ? (
                    <Row xs={1} sm={2} md={3} lg={4}>
                        {games ? games.map((game, index) => {
                            const image = images.find(img => img.name === game.name);
                            return (
                                <Col onClick={() => navigate(`/tracker/${currentUser?.uid}/${image?.id}/${game.id}`)} key={index}>
                                    <GameHeader game={game} imageUrl={image?.imageUrl} />
                                </Col>
                            )
                        }) : <p className='mt-3'>There are no games registered yet</p>}
                    </Row>
                ) : (
                    <Spinner className='mt-3' style={{ color: '#E6B2BA' }} animation="border" />
                )}

            </Container>
        </>
    )
}
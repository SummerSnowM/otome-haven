import { Container, Row, Col } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from "../App";
import { AuthContext } from "../components/AuthProvider";
import { fetchImage } from '../features/usersSlice';
import axios from "axios";

import GameHeader from '../components/memories/GameHeader';

export default function Memories() {
    const { currentUser } = useContext(AuthContext);

    const [games, setGames] = useState([]);
    const images = useSelector(state => state.users.images);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${BASE_URL}/games/${currentUser?.uid}`)
            .then((response) => setGames(response.data.data))
            .catch((error) => console.error(error));

        dispatch(fetchImage({ userId: currentUser?.uid }));
    }, [games, currentUser, dispatch])

    return (
        <>
            <Container className='mt-4'>
                <Row xs={1} sm={2} md={3} lg={4}>
                    {games ? games.map((game, index) => {
                        const image = images.find(img => img.name === game.name);
                        return (
                            <Col key={index}>
                                <GameHeader game={game} imageUrl={image?.imageUrl} />
                            </Col>
                        )
                    }) : <p className='mt-3'>There are no games registered yet</p>}
                </Row>
            </Container>
        </>
    )
}
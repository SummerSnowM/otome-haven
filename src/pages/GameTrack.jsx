import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGame, fetchCharProfile } from '../features/usersSlice';

import axios from 'axios';
import { BASE_URL } from '../App';

export default function GameTrack() {
    const { userId, gameId, id } = useParams();

    //get target game and game pfp
    const gameImg = useSelector((state) => state.users.game);
    const [game, setGame] = useState(null);

    //get and show characters profile icons
    const [showCharacters, setShowCharacters] = useState(false);
    const charImg = useSelector((state) => state.users.characters);
    const [characters, setCharacters] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchGame({ userId, gameId }));
        //get target game info
        axios.get(`${BASE_URL}/games/single/${id}`)
            .then((response) => setGame(response.data.data))
            .catch((error) => console.error(error));

        //get characters info
        dispatch(fetchCharProfile({ userId, gameId }));
        axios.get(`${BASE_URL}/characters/${id}`)
            .then((response) => setCharacters(response.data.data))
            .catch((error) => console.error(error));

    }, [dispatch, userId, gameId, id])

    return (
        <>
            <Container className='mt-4'>
                {game && (
                    <>
                        {/* game profile */}
                        <Row className='w-100'>
                            <Col xs={12} md={5}>
                                <Image className='h-100 w-100' src={gameImg?.imageUrl} />
                            </Col>
                            <Col style={{ backgroundColor: '#FFF7F3' }} className='rounded-3'>
                                <h3 className='mt-2'>{game[0]?.name}</h3>
                                <p><strong>Genre:</strong> {game[0]?.genre}</p>
                                <p><strong>Developer:</strong> {game[0]?.developer}</p>
                                <p><strong>Platform:</strong> {game[0]?.platform}</p>
                                <p><strong>Rating:</strong> {game[0]?.rating}/5</p>
                            </Col>
                        </Row>
                        <hr />
                        <h4>Synopsis</h4>
                        <p>{game[0]?.synopsis}</p>

                        {/* view characters section */}
                        <Button onClick={() => showCharacters ? setShowCharacters(false) : setShowCharacters(true)} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>{showCharacters ? 'Hide Characters' : 'View Characters'}</Button>

                        {showCharacters && (characters ? (
                            <>
                                <Row style={{ backgroundColor: '#FFF7F3' }} className='mt-3 p-3 rounded-3'>
                                    {characters.map((char, index) => {
                                        const currentChar = charImg.find(img => img.name === char.name);
                                        return (
                                            <Col onClick={() => navigate(`/tracker/${char.id}`)} xs={6} sm={4} md={3} lg={2} key={index}>
                                                <Image className='w-100 h-75' src={currentChar?.imageUrl} roundedCircle />
                                                <p className='text-center mt-2'><strong>{char.name}</strong></p>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </>
                        ) : <p className='mt-3'>There are no characters added for this game yet</p>)}
                    </>
                )}
            </Container>
        </>
    )
}
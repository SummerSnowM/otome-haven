import { Container, Row, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharImage } from '../features/usersSlice';

import { BASE_URL } from '../App';
import axios from 'axios';

export default function CharacterProfile() {
    const { userId, gameId, charId, id } = useParams();
    const charImage = useSelector((state) => state.users.character);
    const [character, setCharacter] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        //get character image
        dispatch(fetchCharImage({ userId, gameId, charId }));
        axios.get(`${BASE_URL}/characters/single/${id}`)
            .then((response) => setCharacter(response.data.data))
            .catch((error) => console.error(error));
    }, [dispatch, id, userId, gameId, charId])

    return (
        <>
            <Container className='mt-4'>
                {character && (
                    <>
                        <Row className='w-75'>
                            <Col xs={12} md={5}>
                                <Image className='w-100 mx-auto' style={{ maxHeight: '440px'}} src={charImage?.imageUrl} fluid />
                            </Col>
                            <Col>
                                <h3 className='mt-2'>{character[0]?.name}</h3>
                                <p><strong>Voice Actor:</strong> {character[0]?.voice_actor}</p>
                                <p><strong>Personality:</strong> {character[0]?.personality}</p>
                                <p><strong>Rating:</strong> {character[0]?.rating}/5</p>
                                <h3>My Review:</h3>
                                <p>{character[0]?.review}</p>
                            </Col>
                        </Row>
                        <hr />
                    </>
                )}

            </Container>
        </>
    )
}
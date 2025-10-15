import { Container, Row, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharImage, fetchCgs } from '../features/usersSlice';

import { BASE_URL } from '../App';
import axios from 'axios';

export default function CharacterProfile() {
    const { userId, gameId, charId, id } = useParams();

    const charImage = useSelector((state) => state.users.character);
    const [character, setCharacter] = useState(null);
    const cgs = useSelector((state) => state.users.cgs);

    const dispatch = useDispatch();

    useEffect(() => {
        //get character image
        dispatch(fetchCharImage({ userId, gameId, charId }));
        axios.get(`${BASE_URL}/characters/single/${id}`)
            .then((response) => setCharacter(response.data.data))
            .catch((error) => console.error(error));

        //get character cgs
        dispatch(fetchCgs({ userId, gameId, charId }));
    }, [dispatch, id, userId, gameId, charId])

    console.log(cgs);
    return (
        <>
            <Container className='mt-4'>
                {character && (
                    <>
                        <Row className='w-75'>
                            <Col xs={12} md={5}>
                                <Image className='w-100 mx-auto' style={{ maxHeight: '440px' }} src={charImage?.imageUrl} fluid />
                            </Col>
                            <Col style={{ backgroundColor: '#FFF7F3' }} className='rounded-3'>
                                <h3 className='mt-2'>{character[0]?.name}</h3>
                                <p><strong>Voice Actor:</strong> {character[0]?.voice_actor}</p>
                                <p><strong>Personality:</strong> {character[0]?.personality}</p>
                                <p><strong>Rating:</strong> {character[0]?.rating}/5</p>
                                <h3>My Review:</h3>
                                <p>{character[0]?.review}</p>
                            </Col>
                        </Row>
                        <hr />
                        <h3>Favorite Cgs</h3>
                        {cgs ? (
                            <>
                                <Row style={{ backgroundColor: '#FFF7F3' }} className='mt-3 p-3 rounded-3'>
                                    {cgs[0]?.urls.map((img, index) => {
                                        return (
                                            <Col xs={12} sm={6} md={4} lg={3} className='m-2' key={index}>
                                                <Image src={img} className='w-100 h-100 rounded-2' style={{ maxWidth: '400px', maxHeight: '500px' }} fluid />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </>
                        ) : <p className='mt-3'>There are no cgs added for this character</p>}
                    </>
                )}

            </Container>
        </>
    )
}
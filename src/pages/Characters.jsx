import { Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharProfile } from '../features/usersSlice';
import { BASE_URL } from '../App';
import axios from 'axios';

import AddCharacter from '../components/characters/AddCharacter';
import CharacterCard from '../components/characters/CharacterCard';

export default function Characters() {
    const { userId, gameId, imgId } = useParams();
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const images = useSelector((state) => state.users.characters);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const dispatch = useDispatch();



    useEffect(() => {
        if (loading) {
            axios.get(`${BASE_URL}/characters/${gameId}`)
                .then((response) => setCharacters(response.data.data))
                .then(() => dispatch(fetchCharProfile({ userId, gameId: imgId })))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }
    }, [gameId, dispatch, userId, imgId, loading])
    return (
        <>
            <Container className='mt-4'>
                <h1 className='text-center' style={{ color: '#E6B2BA' }}>Characters</h1>
                <hr />
                <Button onClick={handleOpenModal} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>Add Character here</Button>
                <br />
                {!loading ? (
                    <Row xs={1} sm={2} md={3} lg={4}>
                        {characters ? (
                            characters.map((char, index) => {
                                const image = images.find(img => img.name === char.name);
                                return (
                                    <Col key={index}>
                                        <CharacterCard character={char} image={image} gameId={imgId} userId={userId} setLoading={setLoading} />
                                    </Col>
                                )
                            })
                        ) : <p className='mt-3'>No characters have been added yet</p>}
                    </Row>
                ) : (
                    <Spinner className='mt-3' style={{ color: '#E6B2BA' }} animation="border" />
                )}

            </Container>

            <AddCharacter showModal={showModal} closeModal={handleCloseModal} imageId={imgId} gameId={gameId} userId={userId} setLoading={setLoading} />
        </>
    )
}
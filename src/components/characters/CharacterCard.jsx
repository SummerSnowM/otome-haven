import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../App';
import { deleteCharacter } from '../../features/usersSlice';

import UpdateCharacter from './UpdateCharacter';

export default function CharacterCard({ character, image, gameId, userId }) {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDelete = () => {
        //delete data from neon console
        axios.delete(`${BASE_URL}/characters/${character.id}`)
            .then((response) => console.log(response.data.message))
            .catch((error) => console.error(error));

        //delete document from firebase
        dispatch(deleteCharacter({ userId, gameId, charId: image.id }));
    }

    return (
        <>
            <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }} className='mt-3'>
                <Card.Body>
                    <Card.Img className='img-fluid rounded-4' style={{ height: '340px' }} src={image?.imageUrl}></Card.Img>
                    <Card.Text className='mt-2 text-center'><strong>{character.name}</strong></Card.Text>
                    <Button onClick={() => handleOpenModal()} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                        <i class="bi bi-pencil-fill"></i>
                    </Button>
                    <Button onClick={() => handleDelete()} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                        <i class="bi bi-trash3-fill"></i>
                    </Button>
                </Card.Body>
            </Card>

            <UpdateCharacter showModal={showModal} closeModal={handleCloseModal} character={character} />
        </>
    )
}
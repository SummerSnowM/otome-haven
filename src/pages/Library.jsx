import { Container, Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react';

import AddGame from '../components/games/AddGame';
export default function Library() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Container className='mt-4'>
                <Button onClick={handleOpenModal} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>Register New Game</Button>
            </Container>

            <AddGame showModal={showModal} closeModal={handleCloseModal} />
        </>
    )
}
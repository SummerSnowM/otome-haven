import { useState } from "react"
import { Container, Card, Button } from 'react-bootstrap';

export default function LatestGame({ game }) {
    const [showDescription, setShowDescription] = useState(false);

    const handleToggleDescription = () => setShowDescription(!showDescription);

    return (
        <>
            <Card className='mt-3 m-5 rounded-3 p-3 align-items-center' style={{ backgroundColor: '#FFF7F3', border: 'transparent' }}>
                <Card.Img className='rounded-3' src={game?.image?.url} style={{ maxWidth: '600px', height: 'auto' }} fluid></Card.Img>
                <Card.Title className='mt-3'>{game?.title}</Card.Title>
                <Card.Text>
                    <strong>Release Date: </strong>{game?.released}
                </Card.Text>
                <Button style={{ backgroundColor: '#E6B2BA', color: 'white', border: 'transparent' }} onClick={handleToggleDescription}>
                    {showDescription ? 'Hide Description' : 'Show Description'}
                </Button>
                {showDescription && (
                    <Card.Text className="mt-2">
                        {game.description || 'There is no description yet'}
                    </Card.Text>
                )}
            </Card>
        </>
    )
}
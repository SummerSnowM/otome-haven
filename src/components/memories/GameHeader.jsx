import { Card } from 'react-bootstrap';

export default function GameHeader({ game, imageUrl }) {
    return (
        <>
            <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }} className='m-2 p-2'>
                <Card.Img className='rounded-4 mb-3' src={imageUrl}></Card.Img>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                    <strong>Genre:</strong> {game.genre} <br />
                    <strong>Developer:</strong> {game.developer}
                </Card.Text>
            </Card>
        </>
    )
}
import { Card, Button } from 'react-bootstrap';

export default function CharacterCard({ character, imageUrl }) {
    return (
        <>
            <Card className='mt-3'>
                <Card.Body>
                    <Card.Img className='img-fluid rounded-4' style={{ height: '340px'}} src={imageUrl}></Card.Img>
                    <Card.Text className='mt-2 text-center'><strong>{character.name}</strong></Card.Text>
                    <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                        <i class="bi bi-pencil-fill"></i>
                    </Button>
                    <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                        <i class="bi bi-trash3-fill"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}
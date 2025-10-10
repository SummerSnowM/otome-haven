import { Card, Container, Image, Row, Col, Button } from 'react-bootstrap';

export default function GameCard({ game, imageUrl }) {
    return (
        <>
            <Card className='mt-3'>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Img className='h-100' src={`${imageUrl}`} />
                        </Col>
                        <Col>
                            <Card.Title>{game.name}</Card.Title>
                            <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-people-fill"></i>
                            </Button>
                            <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-pencil-fill"></i>
                            </Button>
                            <Button style={{ backgroundColor: '#E6B2BA', border: 'transparent' }} className='m-1'>
                                <i class="bi bi-trash3-fill"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
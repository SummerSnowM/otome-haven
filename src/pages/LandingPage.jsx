import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import landing from '../assets/landing.jpg'

export default function LandingPage() {
    return (
        <>
            <Container className='mt-5 mb-5'>
                <h1 style={{ color: '#E6B2BA' }} className='text-center'>Welcome to Otome Haven</h1>
                <br />
                <Row className='w-100'>
                    <Col xs={12} md={5}>
                        <Image src={landing} fluid />
                    </Col>
                    <Col style={{ backgroundColor: '#FFF7F3' }} className='m-3 p-2 rounded-3'>
                        <p>Hello there! I’m a huge fan of otome games — they’re my main genre and honestly, my biggest obsession. There’s just something about those beautifully drawn 2D anime boys that completely steals my heart every single time 💘

                            After playing so many games, I realized most apps out there are either just walkthroughs or reviews. But I wanted something more — an all-in-one space where I could keep track of every game I’ve played, every route I’ve finished, and most importantly… never forget all the amazing characters I’ve met along the way.

                            This place is my way of keeping that dream alive — a little haven for my otome memories, and maybe yours too. 🌸</p>
                    </Col>
                </Row>
                <hr />
                <Row xs={1} sm={2} md={4} className='align-items-center text-center'>
                    <Col className='mt-2 rounded-3'>
                        <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }}>
                            <Card.Body>
                                <i class="bi bi-calendar2-week-fill" style={{ fontSize: '60px' }}></i>
                            </Card.Body>
                            <Card.Text>
                                Latest news is updated to track what games are coming up in the current year
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col className='mt-2 rounded-3'>
                        <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }}>
                            <Card.Body>
                                <i class="bi bi-nintendo-switch" style={{ fontSize: '60px' }}></i>
                            </Card.Body>
                            <Card.Text>
                                All games that you have played and characters you have met will be recorded and displayed in this section to help you remember and reminisce
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col className='mt-2 rounded-3'>
                        <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }}>
                            <Card.Body>
                                <i class="bi bi-book-fill" style={{ fontSize: '60px' }}></i>
                            </Card.Body>
                            <Card.Text>
                                Add new games and characters to list down your opinions and review them
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col className='mt-2 rounded-3'>
                        <Card style={{ backgroundColor: '#FFF7F3', border: 'transparent' }}>
                            <Card.Body>
                                <i class="bi bi-journal-bookmark-fill" style={{ fontSize: '60px' }}></i>
                            </Card.Body>
                            <Card.Text>
                                For completionists who strive to 100% complete each game, this tracker allows you to record down each route as you explore along the way.
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
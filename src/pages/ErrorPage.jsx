import { Container, Card } from 'react-bootstrap';

export default function ErrorPage() {
    return (
        <>
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh', backgroundColor: '#FFF7F3' }}
            >
                <Card className="text-center p-5" style={{ minWidth: '400px', minHeight: '300px' }}>
                    <Card.Title style={{ color: '#E6B2BA', fontSize: '5rem' }}>
                        <strong>404</strong>
                    </Card.Title>
                    <Card.Text style={{ fontSize: '2rem' }}>
                        <strong>Page not found</strong>
                    </Card.Text>
                </Card>
            </Container>
        </>
    );
}
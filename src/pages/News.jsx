import { useState, useEffect, useContext } from "react"
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import axios from 'axios';

import LatestGame from "../components/news/LatestGame";
import { AuthContext } from "../components/AuthProvider";

export default function News() {
    const { currentUser } = useContext(AuthContext);
    const [latestGames, setLatestGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const VNDB_URL = `https://api.vndb.org/kana/vn`;

    useEffect(() => {
        if (loading) {
            // get current date
            const currentDate = new Date();

            //get 8 months before the current date
            let pastDate = new Date(currentDate);
            pastDate.setMonth(pastDate.getMonth() - 6);
            pastDate = pastDate.toLocaleDateString('en-CA', {
                timeZone: 'Asia/Kuala_Lumpur'
            });

            //set filters
            const data = {
                "filters": ["and",
                    ["developer", "=", ["id", "=", "p589"]],
                    ["released", ">=", `${pastDate}`]
                ],
                "fields": "id, title, image.url, platforms, description, released",
                "results": 20,
                "sort": "released",
                "reverse": true
            };

            axios.post(`${VNDB_URL}`, data)
                .then((response) => setLatestGames(response.data))
                .catch((error) => console.error(error));


            setLoading(false);
        }
    }, [loading, VNDB_URL])

    if (!currentUser) return <Navigate to='/login' replace />
    return (
        <>
            <Container className='mt-4'>
                <h1 className='text-center' style={{ color: '#E6B2BA' }}>Latest Otomate Games</h1>
                {!loading ? (
                    <Row>
                        {latestGames.results && (latestGames.results.length > 0 ? (
                            <>
                                {latestGames.results.map((game, index) => {
                                    return (
                                        <Col xs={12} sm={12} md={6} key={index}>
                                            <LatestGame game={game} />
                                        </Col>
                                    )
                                })}
                            </>
                        ) : <p className='mt-3'>Loading...</p>)}
                    </Row>
                ) : (
                    <Spinner className='mt-3' style={{ color: '#E6B2BA' }} animation="border" />
                )}

            </Container>
        </>
    )
}
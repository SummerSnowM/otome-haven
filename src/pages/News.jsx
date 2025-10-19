import { useState, useEffect } from "react"
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import LatestGame from "../components/news/LatestGame";

export default function News() {
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

    return (
        <>
            <Container className='mt-4'>
                <h1 className='text-center' style={{ color: '#E6B2BA' }}>Latest Otomate Games</h1>
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
            </Container>
        </>
    )
}
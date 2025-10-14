import { Container, Button, Tab, Tabs } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../App';
import axios from 'axios';
import Choice from '../components/tracker/Choice';
import EndingsList from '../components/tracker/EndingsList';

export default function CharacterTrack() {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    //use effect trigger (avoid infinite loops)
    const [loading, setLoading] = useState(true);

    //fetch all types of endings
    const [bestEndings, setBestEndings] = useState([]);
    const [badEndings, setBadEndings] = useState([]);
    const [bestFriendEndings, setBestFriendEndings] = useState([]);
    const [normalEndings, setNormalEndings] = useState([]);
    const [gameOverEndings, setGameOverEndings] = useState([]);
    const [unrequitedLoveEndings, setUnrequitedLoveEndings] = useState([]);
    const [defaultEndings, setDefaultEndings] = useState([]);

    useEffect(() => {
        if (loading) {
            Promise.all([
                axios.get(`${BASE_URL}/endings/bestend/${id}`).then(res => setBestEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/badend/${id}`).then(res => setBadEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/bffend/${id}`).then(res => setBestFriendEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/normalend/${id}`).then(res => setNormalEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/gameoverend/${id}`).then(res => setGameOverEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/unrequitedloveend/${id}`).then(res => setUnrequitedLoveEndings(res.data.data)),
                axios.get(`${BASE_URL}/endings/defaultend/${id}`).then(res => setDefaultEndings(res.data.data)),

            ]).catch(error => {
                console.error(error)
            }).finally(() => setLoading(false));
        }
    }, [loading, id]);

    return (
        <>
            <Container className='mt-4'>
                <Button onClick={handleOpenModal} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>Add New Chapter</Button>

                {/* tabs */}
                <Tabs
                    defaultActiveKey="default"
                    className='mt-5 mb-3 custom-tabs'
                >
                    <Tab eventKey='default' title='Progress'>
                        <EndingsList endings={defaultEndings} charId={id} type='default' setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='best' title='Best Ending'>
                        <EndingsList endings={bestEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='bad' title='Bad Ending'>
                        <EndingsList endings={badEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='bff' title='Best Friends Ending'>
                        <EndingsList endings={bestFriendEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='normal' title='Normal Ending'>
                        <EndingsList endings={normalEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='game-over' title='Game Over Ending'>
                        <EndingsList endings={gameOverEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                    <Tab eventKey='unrequited' title='Unrequited Ending'>
                        <EndingsList endings={unrequitedLoveEndings} charId={id} setLoading={setLoading} />
                    </Tab>
                </Tabs>
            </Container>

            <Choice showModal={showModal} closeModal={handleCloseModal} charId={id} isNewChap={true} setLoading={setLoading} />
        </>
    )
}
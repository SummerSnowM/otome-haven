import { Table, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../../App';
import Choice from './Choice';
import Notification from '../Notification';

export default function EndingsList({ endings, charId, type }) {
    const [activeChapter, setActiveChapter] = useState(null);
    const [activeChoice, setActiveChoice] = useState(0);

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleOpenToast = () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

    const handleOpenModal = (chapter, choice) => {
        setActiveChapter(chapter);
        setActiveChoice(choice);
    };

    const handleCloseModal = () => {
        setActiveChapter(null);
        setActiveChoice(0);
    };

    const [ending, setEnding] = useState(0);
    const [showForm, setShowForm] = useState(false);

    const handleDeleteChapter = (chapter, id) => {
        axios.delete(`${BASE_URL}/chapter/${id}/${chapter}`)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        handleOpenToast();
    }

    const handleUpdateEnding = () => {
        console.log('yo');
        axios.put(`${BASE_URL}/routes/${charId}/${ending}`)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        handleOpenToast();
        setShowForm(false);
    }

    // Group endings by chapter
    const groupedEndings = endings?.reduce((acc, ending) => {
        if (!acc[ending.chapter]) acc[ending.chapter] = [];
        acc[ending.chapter].push(ending);
        return acc;
    }, {});

    return (
        <>
            {type && type === 'default' && (
                <>
                    <Button onClick={() => showForm ? setShowForm(false) : setShowForm(true)} style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}>{showForm ? 'Undo' : 'Confirm Route Ending'}</Button>
                    {showForm && (

                        <Form className='mt-3 rounded-2 p-3 w-75 mb-2' style={{ backgroundColor: '#FFF7F3', border: 'transparent' }} onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateEnding();
                        }}>
                            <Form.Group >
                                <Form.Label>Select Ending Type</Form.Label>
                                <Form.Select value={ending} onChange={e => setEnding(e.target.value)}>
                                    <option></option>
                                    <option value={1}>Best Ending</option>
                                    <option value={2}>Bad Ending</option>
                                    <option value={4}>Normal Ending</option>
                                    <option value={3}>Best Friends Ending</option>
                                    <option value={5}>Game Over / Death Ending</option>
                                    <option value={6}>Unrequited Love Ending</option>
                                </Form.Select>
                            </Form.Group>
                            <Button type='submit' className='mt-3' style={{ backgroundColor: '#FAD0C4', border: 'transparent', color: 'black' }}>Confirm Ending</Button>
                        </Form>
                    )}
                </>
            )}

            {endings && endings.length > 0 ? (
                <Table className='mt-3' bordered>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Chapter</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedEndings)
                            .sort((a, b) => a - b)
                            .map((chapter) => (
                                <tr key={chapter}>
                                    <td className="align-top">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{chapter}</span>
                                            <Button
                                                onClick={() => handleDeleteChapter(chapter, charId)}
                                                style={{
                                                    backgroundColor: '#E6B2BA',
                                                    border: 'transparent',
                                                    fontSize: '10px',
                                                }}
                                                className="ms-2"
                                            >
                                                <i className="bi bi-trash3-fill"></i>
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        {groupedEndings[chapter].map((ending, index) => (
                                            <div
                                                key={index}
                                                className="d-flex justify-content-between align-items-center mb-2"
                                            >
                                                <span>{ending.description}</span>
                                                <Button
                                                    onClick={() => handleOpenModal(chapter, ending.id)}
                                                    style={{
                                                        backgroundColor: '#E6B2BA',
                                                        border: 'transparent',
                                                        fontSize: '10px',
                                                    }}
                                                    className="ms-2"
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Button>
                                            </div>
                                        ))}

                                        <Button
                                            style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => handleOpenModal(chapter, 0)}
                                        >
                                            Add Description
                                        </Button>

                                        <Choice
                                            showModal={activeChapter === chapter}
                                            closeModal={handleCloseModal}
                                            chap={chapter}
                                            charId={charId}
                                            choice={activeChoice}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>


            ) : (
                <p className="mt-3">No chapters or ending have been added yet</p>
            )}
            <Notification message={message} closeToast={handleCloseToast} showToast={showToast} />
        </>
    );
}

import { Table, Button } from 'react-bootstrap';
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

    const handleDeleteChapter = (chapter, id) => {
        axios.delete(`${BASE_URL}/chapter/${id}/${chapter}`)
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));

        handleOpenToast();
    }

    // Group endings by chapter
    const groupedEndings = endings?.reduce((acc, ending) => {
        if (!acc[ending.chapter]) acc[ending.chapter] = [];
        acc[ending.chapter].push(ending);
        return acc;
    }, {});

    return (
        <>
            {endings && endings.length > 0 ? (
                <Table bordered>
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

import { Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import AddChoice from './AddChoice';

export default function EndingsList({ endings, charId, type }) {
    const [activeChapter, setActiveChapter] = useState(null);

    const handleOpenModal = (chapter) => setActiveChapter(chapter);
    const handleCloseModal = () => setActiveChapter(null);

    // Group endings by chapter
    const groupedEndings = endings?.reduce((acc, ending) => {
        if (!acc[ending.chapter]) {
            acc[ending.chapter] = [];
        }
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
                        {Object.keys(groupedEndings).sort((a, b) => a - b).map((chapter) => (
                            <tr key={chapter}>
                                <td className="align-top">{chapter}</td>
                                <td>
                                    {groupedEndings[chapter].map((ending, index) => (
                                        <div key={index}>
                                            {ending.description}
                                        </div>
                                    ))}
                                    <Button
                                        style={{ backgroundColor: '#E6B2BA', border: 'transparent' }}
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => handleOpenModal(chapter)}
                                    >
                                        Add Description
                                    </Button>
                                    <AddChoice 
                                        showModal={activeChapter === chapter} 
                                        closeModal={handleCloseModal} 
                                        chap={chapter} 
                                        charId={charId} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className='mt-3'>No chapters or ending have been added yet</p>
            )}
        </>
    );
}
import React, { useState } from 'react';
import styles from './UpdateStudentForm.module.css';
import { FaTimes } from 'react-icons/fa';

const UpdateStudentForm = ({ student, onUpdate, onCancel }) => {
    const [marks, setMarks] = useState({
        quiz1: {
            obtained: student.marks?.quiz1?.obtained || '',
            total: student.marks?.quiz1?.total || 20
        },
        quiz2: {
            obtained: student.marks?.quiz2?.obtained || '',
            total: student.marks?.quiz2?.total || 20
        },
        assignment1: {
            obtained: student.marks?.assignment1?.obtained || '',
            total: student.marks?.assignment1?.total || 50
        },
        assignment2: {
            obtained: student.marks?.assignment2?.obtained || '',
            total: student.marks?.assignment2?.total || 50
        },
        mid: {
            obtained: student.marks?.mid?.obtained || '',
            total: student.marks?.mid?.total || 50
        },
        final: {
            obtained: student.marks?.final?.obtained || '',
            total: student.marks?.final?.total || 100
        }
    });

    const handleMarksChange = (field, type, value) => {
        setMarks(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [type]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filter out empty values and validate
        const filteredMarks = {};
        Object.entries(marks).forEach(([key, value]) => {
            if (value.obtained !== '' && value.total !== '') {
                if (parseInt(value.obtained) <= parseInt(value.total)) {
                    filteredMarks[key] = {
                        obtained: parseInt(value.obtained),
                        total: parseInt(value.total)
                    };
                }
            }
        });
        onUpdate({ ...student, marks: filteredMarks });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h3>Update Marks for {student.name}</h3>
                    <button className={styles.closeBtn} onClick={onCancel}>
                        <FaTimes />
                    </button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.marksGrid}>
                        <div className={styles.markField}>
                            <label>Quiz 1:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.quiz1.obtained}
                                    onChange={e => handleMarksChange('quiz1', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.quiz1.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.quiz1.total}
                                    onChange={e => handleMarksChange('quiz1', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className={styles.markField}>
                            <label>Quiz 2:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.quiz2.obtained}
                                    onChange={e => handleMarksChange('quiz2', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.quiz2.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.quiz2.total}
                                    onChange={e => handleMarksChange('quiz2', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className={styles.markField}>
                            <label>Assignment 1:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.assignment1.obtained}
                                    onChange={e => handleMarksChange('assignment1', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.assignment1.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.assignment1.total}
                                    onChange={e => handleMarksChange('assignment1', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className={styles.markField}>
                            <label>Assignment 2:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.assignment2.obtained}
                                    onChange={e => handleMarksChange('assignment2', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.assignment2.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.assignment2.total}
                                    onChange={e => handleMarksChange('assignment2', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className={styles.markField}>
                            <label>Mid:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.mid.obtained}
                                    onChange={e => handleMarksChange('mid', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.mid.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.mid.total}
                                    onChange={e => handleMarksChange('mid', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className={styles.markField}>
                            <label>Final:</label>
                            <div className={styles.markInputs}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Obtained"
                                    value={marks.final.obtained}
                                    onChange={e => handleMarksChange('final', 'obtained', e.target.value)}
                                    min="0"
                                    max={marks.final.total}
                                />
                                <span className={styles.separator}>/</span>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={marks.final.total}
                                    onChange={e => handleMarksChange('final', 'total', e.target.value)}
                                    min="1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button className={styles.button} type="submit">Update</button>
                        <button className={styles.cancel} type="button" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudentForm; 
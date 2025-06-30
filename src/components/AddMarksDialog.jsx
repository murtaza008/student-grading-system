import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaChartBar, FaUser } from 'react-icons/fa';
import styles from './AddMarksDialog.module.css';

const AddMarksDialog = ({ students, onAddMarks, onCancel }) => {
    const [markType, setMarkType] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [studentMarks, setStudentMarks] = useState({});

    const markTypes = [
        { value: 'quiz1', label: 'Quiz 1' },
        { value: 'quiz2', label: 'Quiz 2' },
        { value: 'assignment1', label: 'Assignment 1' },
        { value: 'assignment2', label: 'Assignment 2' },
        { value: 'mid', label: 'Mid Term' },
        { value: 'final', label: 'Final Exam' },
        { value: 'participation', label: 'Class Participation' },
        { value: 'project', label: 'Project' }
    ];

    // When markType changes, pre-fill totalMarks and studentMarks if data exists
    useEffect(() => {
        if (!markType) {
            setTotalMarks('');
            setStudentMarks({});
            return;
        }
        // Find the first student with marks for this type
        let foundTotal = '';
        const newStudentMarks = {};
        for (const student of students) {
            if (student.marks && student.marks[markType]) {
                if (!foundTotal) {
                    foundTotal = student.marks[markType].total;
                }
                newStudentMarks[student.id] = student.marks[markType].obtained;
            }
        }
        setTotalMarks(foundTotal ? String(foundTotal) : '');
        setStudentMarks(newStudentMarks);
    }, [markType, students]);

    const handleStudentMarkChange = (studentId, value) => {
        setStudentMarks(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!markType || !totalMarks) return;

        const marksToAdd = {};
        students.forEach(student => {
            const obtained = studentMarks[student.id];
            const finalObtained = obtained && obtained !== '' ? parseInt(obtained) : 0;

            marksToAdd[student.id] = {
                ...student,
                marks: {
                    ...student.marks,
                    [markType]: {
                        obtained: finalObtained,
                        total: parseInt(totalMarks)
                    }
                }
            };
        });

        onAddMarks(marksToAdd);
    };

    const isFormValid = markType && totalMarks && Object.keys(studentMarks).length > 0;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <FaChartBar className={styles.headerIcon} />
                        <h3>Add Marks</h3>
                    </div>
                    <button className={styles.close} onClick={onCancel}>
                        <FaTimes />
                    </button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formSection}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Mark Type</label>
                                <select
                                    className={styles.input}
                                    value={markType}
                                    onChange={(e) => setMarkType(e.target.value)}
                                    required
                                >
                                    <option value="">Select Mark Type</option>
                                    {markTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Total Marks</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    placeholder="Total"
                                    value={totalMarks}
                                    onChange={(e) => setTotalMarks(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h4 className={styles.sectionTitle}>Student Marks</h4>
                        <div className={styles.studentsGrid}>
                            {students.map((student) => (
                                <div key={student.id} className={styles.studentCard}>
                                    <div className={styles.studentInfo}>
                                        <FaUser className={styles.studentIcon} />
                                        <div>
                                            <div className={styles.studentName}>{student.name}</div>
                                            <div className={styles.studentRoll}>{student.rollNo}</div>
                                        </div>
                                    </div>
                                    <div className={styles.markInput}>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={studentMarks[student.id] || ''}
                                            onChange={(e) => handleStudentMarkChange(student.id, e.target.value)}
                                            min="0"
                                            max={totalMarks || 999}
                                        />
                                        <span className={styles.markSeparator}>/</span>
                                        <span className={styles.totalMarks}>{totalMarks || '-'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            <FaChartBar />
                            Add Marks
                        </button>
                        <button
                            className={styles.cancelButton}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMarksDialog; 
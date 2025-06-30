import React, { useState } from 'react';
import { FaTimes, FaGraduationCap, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import styles from './GradeWeightageDialog.module.css';
import { calculateGradesBulk } from '../services/api';

const getMarkTypesFromStudents = (students) => {
    const markTypesSet = new Set();
    students.forEach(student => {
        if (student.marks) {
            Object.keys(student.marks).forEach(type => markTypesSet.add(type));
        }
    });
    return Array.from(markTypesSet);
};

const getMarkTypeLabel = (key) => {
    const labels = {
        quiz1: 'Quiz 1', quiz2: 'Quiz 2',
        assignment1: 'Assignment 1', assignment2: 'Assignment 2',
        mid: 'Mid Term', final: 'Final Exam',
        participation: 'Class Participation', project: 'Project'
    };
    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const defaultBoundaries = [
    { grade: 'A', min: 90 },
    { grade: 'A-', min: 80 },
    { grade: 'B+', min: 75 },
    { grade: 'B', min: 70 },
    { grade: 'B-', min: 65 },
    { grade: 'C+', min: 60 },
    { grade: 'C', min: 55 },
    { grade: 'C-', min: 50 },
    { grade: 'F', min: 0 }
];


const GradeWeightageDialog = ({ students, onClose, sectionId, onGradesGenerated }) => {
    const [weightages, setWeightages] = useState({});
    const [showBoundaries, setShowBoundaries] = useState(false);

    const handleChange = (type, value) => {
        setWeightages(prev => ({ ...prev, [type]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setShowBoundaries(true);
    };

    const totalWeight = Object.values(weightages).reduce((a, b) => a + Number(b), 0);
    const markTypes = getMarkTypesFromStudents(students);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        {showBoundaries && (
                            <button className={styles.backButton} onClick={() => setShowBoundaries(false)}>
                                <FaArrowLeft />
                            </button>
                        )}
                        <FaGraduationCap className={styles.headerIcon} />
                        <h3>{showBoundaries ? 'Set Grade Boundaries' : 'Generate Grades'}</h3>
                    </div>
                    <button className={styles.close} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.body}>
                    {!showBoundaries ? (
                        markTypes.length === 0 ? (
                            <div className={styles.emptyState}>
                                <FaChartBar className={styles.emptyIcon} />
                                <p>No marks available. Please add marks first.</p>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleNext}>
                                <div className={styles.formSection}>
                                    <h4 className={styles.sectionTitle}>Grade Weightage</h4>
                                    <div className={styles.weightageGrid}>
                                        {markTypes.map(type => (
                                            <div className={styles.weightageCard} key={type}>
                                                <label className={styles.label}>{getMarkTypeLabel(type)}</label>
                                                <div className={styles.inputGroup}>
                                                    <input
                                                        className={styles.input}
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        placeholder="0"
                                                        value={weightages[type] || ''}
                                                        onChange={e => handleChange(type, e.target.value)}
                                                        required
                                                    />
                                                    <span className={styles.unit}>%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.totalSection}>
                                    <div className={styles.totalCard}>
                                        <span className={styles.totalLabel}>Total Weightage</span>
                                        <span className={`${styles.totalValue} ${totalWeight === 100 ? styles.totalOk : styles.totalError}`}>
                                            {totalWeight}%
                                        </span>
                                    </div>
                                    {totalWeight !== 100 && (
                                        <p className={styles.totalNote}>
                                            Total weightage must equal 100%
                                        </p>
                                    )}
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        className={styles.submitButton}
                                        type="submit"
                                        disabled={totalWeight !== 100}
                                    >
                                        <FaGraduationCap />
                                        Next
                                    </button>
                                    <button
                                        className={styles.cancelButton}
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )
                    ) : (
                        <GradeBoundariesView
                            students={students}
                            weightages={weightages}
                            sectionId={sectionId}
                            onClose={onClose}
                            onGradesGenerated={onGradesGenerated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const GradeBoundariesView = ({ students, weightages, sectionId, onClose, onGradesGenerated }) => {
    const [boundaries, setBoundaries] = useState(defaultBoundaries);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBoundaryChange = (idx, value) => {
        setBoundaries(prev => prev.map((b, i) => i === idx ? { ...b, min: value ? parseInt(value, 10) : 0 } : b));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let i = 0; i < boundaries.length - 1; ++i) {
            if (boundaries[i].min <= boundaries[i + 1].min) {
                setError('Each grade minimum must be greater than the next.');
                return;
            }
        }
        if (boundaries[boundaries.length - 1].min !== 0) {
            setError('F minimum must be 0.');
            return;
        }
        setError('');
        setLoading(true);
        await calculateGradesBulk(sectionId, students, weightages, boundaries);
        setLoading(false);
        onGradesGenerated();
        onClose();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.weightageGrid}>
                {boundaries.map((b, idx) => (
                    <div key={b.grade} className={styles.boundaryRow}>
                        <span className={styles.label}>{b.grade}</span>
                        <input
                            className={styles.input}
                            type="number"
                            min="0"
                            max="100"
                            value={b.min}
                            onChange={e => handleBoundaryChange(idx, e.target.value)}
                            required
                            disabled={b.grade === 'F'}
                        />
                        <span className={styles.unit}>%</span>
                    </div>
                ))}
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <div className={styles.actions}>
                <button className={styles.submitButton} type="submit" disabled={loading}>
                    {loading ? 'Calculating...' : 'Generate Grades'}
                </button>
                <button className={styles.cancelButton} type="button" onClick={onClose} disabled={loading}>
                    Cancel
                </button>
            </div>
        </form>
    );
};


export default GradeWeightageDialog; 
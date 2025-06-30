import React from 'react';
import { FaTimes, FaUserGraduate, FaChartBar } from 'react-icons/fa';
import styles from './ViewMarksDialog.module.css';

const ViewMarksDialog = ({ student, onClose }) => {
    if (!student) return null;
    const marks = student.marks || {};

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <FaUserGraduate className={styles.studentIcon} />
                        <div>
                            <h3 className={styles.title}>{student.name}</h3>
                            <p className={styles.subtitle}>Roll No: {student.rollNo}</p>
                        </div>
                    </div>
                    <button className={styles.close} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.body}>
                    {Object.keys(marks).length === 0 ? (
                        <div className={styles.emptyState}>
                            <FaChartBar className={styles.emptyIcon} />
                            <p>No marks available for this student</p>
                        </div>
                    ) : (
                        <div className={styles.marksContainer}>
                            <h4 className={styles.sectionTitle}>Academic Performance</h4>
                            <div className={styles.marksGrid}>
                                {Object.entries(marks).map(([type, value]) => (
                                    <div key={type} className={styles.markCard}>
                                        <div className={styles.markType}>
                                            {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </div>
                                        <div className={styles.markValue}>
                                            <span className={styles.obtained}>{value.obtained}</span>
                                            <span className={styles.separator}>/</span>
                                            <span className={styles.total}>{value.total}</span>
                                        </div>
                                        <div className={styles.percentage}>
                                            {((value.obtained / value.total) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewMarksDialog; 
import React, { useState } from 'react';
import { FaTrash, FaEye, FaUsers, FaGraduationCap, FaUserGraduate, FaSpinner } from 'react-icons/fa';
import ViewMarksDialog from './ViewMarksDialog';
import styles from './StudentList.module.css';

const StudentList = ({ students, onDelete }) => {
    const [viewingStudent, setViewingStudent] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleViewMarks = (student) => {
        setViewingStudent(student);
    };

    const handleCloseViewMarks = () => {
        setViewingStudent(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this student?')) {
            setDeletingId(id);
            try {
                await onDelete(id);
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (students.length === 0) {
        return (
            <div className="empty-state">
                <FaUsers className="empty-state-icon" />
                <h3 className="empty-state-title">No Students Found</h3>
                <p className="empty-state-description">
                    Add students to this section to begin managing academic records
                </p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <FaUserGraduate className={styles.icon} />
                        <h3>Student Records</h3>
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.studentCount}>
                            <FaUsers className={styles.statsIcon} />
                            {students.length} students
                        </span>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Roll No</th>
                                <th style={{ textAlign: 'left' }}>Student Name</th>
                                <th style={{ textAlign: 'center' }}>Grade</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className={styles.row}>
                                    <td className={styles.rollNo} style={{ textAlign: 'left' }}>
                                        <span className={styles.rollNoText}>{student.rollNo}</span>
                                    </td>
                                    <td className={styles.studentName} style={{ textAlign: 'left' }}>
                                        <div className={styles.studentInfo}>
                                            <FaUserGraduate className={styles.studentIcon} />
                                            <span>{student.name}</span>
                                        </div>
                                    </td>
                                    <td className={styles.grade} style={{ textAlign: 'center' }}>
                                        {student.grade ? (
                                            <span className={`${styles.gradeBadge} ${styles[`grade${student.grade}`]}`}>
                                                {student.grade}
                                            </span>
                                        ) : (
                                            <span className={styles.noGrade}>Not Graded</span>
                                        )}
                                    </td>
                                    <td className={styles.actions} style={{ textAlign: 'center' }}>
                                        <button
                                            className={`btn btn-sm ${styles.btnView}`}
                                            onClick={() => handleViewMarks(student)}
                                            title="View Marks & Grades"
                                        >
                                            <FaEye />
                                            View
                                        </button>
                                        <button
                                            className={`btn btn-sm btn-danger ${styles.btnDelete}`}
                                            onClick={() => handleDelete(student.id)}
                                            disabled={deletingId === student.id}
                                            title="Remove Student"
                                        >
                                            {deletingId === student.id ? (
                                                <FaSpinner className="spinner" />
                                            ) : (
                                                <FaTrash />
                                            )}
                                            {deletingId === student.id ? 'Removing...' : 'Remove'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {viewingStudent && (
                <ViewMarksDialog
                    student={viewingStudent}
                    onClose={handleCloseViewMarks}
                />
            )}
        </>
    );
};

export default StudentList; 
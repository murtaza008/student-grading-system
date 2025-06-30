import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import AddMarksDialog from '../components/AddMarksDialog';
import GradeButton from '../components/GradeButton';
import GradeWeightageDialog from '../components/GradeWeightageDialog';
import {
    getStudents,
    addStudent,
    deleteStudent,
    giveGrades,
    addMarksBulk
} from '../services/api';
import { FaArrowLeft, FaUsers, FaPlus, FaChartBar, FaGraduationCap, FaUserGraduate } from 'react-icons/fa';
import styles from './SectionPage.module.css';

const SectionPage = () => {
    const { sectionId } = useParams();
    const [students, setStudents] = useState([]);
    const [showAddMarks, setShowAddMarks] = useState(false);
    const [showWeightageDialog, setShowWeightageDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchStudents = () => {
        getStudents(sectionId).then(setStudents);
    };

    useEffect(() => {
        fetchStudents();
        // eslint-disable-next-line
    }, [sectionId]);

    const handleAdd = (student) => {
        addStudent(sectionId, student).then(fetchStudents);
    };

    const handleDelete = (id) => {
        deleteStudent(sectionId, id).then(fetchStudents);
    };

    const handleGrade = () => {
        setShowWeightageDialog(true);
    };

    const handleAddMarks = (studentsWithMarks) => {
        addMarksBulk(sectionId, studentsWithMarks).then(() => {
            setShowAddMarks(false);
            fetchStudents();
        });
    };

    return (
        <div className="container">
            {/* Page Header */}
            <div className="page-header">
                <div className="d-flex align-center gap-3 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <FaArrowLeft />
                        Back to Dashboard
                    </Link>
                </div>
                <h1 className="page-title">Section {sectionId}</h1>
                <p className="page-subtitle">
                    Manage students, academic records, and grading for this section
                </p>
            </div>

            {/* Stats Section */}
            <div className="section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaUsers className="stat-icon" />
                        <span className="stat-number">{students.length}</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-card success">
                        <FaUserGraduate className="stat-icon" />
                        <span className="stat-number">Academic</span>
                        <span className="stat-label">Management</span>
                    </div>
                    <div className="stat-card info">
                        <FaGraduationCap className="stat-icon" />
                        <span className="stat-number">Professional</span>
                        <span className="stat-label">Grading</span>
                    </div>
                </div>
            </div>

            {/* Add Student Form */}
            <div className="section">
                <div className="content-area">
                    <div className="content-header">
                        <h2 className="section-title">Add New Student</h2>
                        <p className="section-description">
                            Enter student information to add them to this section
                        </p>
                    </div>
                    <div className="content-body">
                        <AddStudentForm onAdd={handleAdd} />
                    </div>
                </div>
            </div>

            {/* Student List with Action Buttons */}
            <div className="section">
                <div className="content-area">
                    <div className="content-header">
                        <div className="d-flex justify-between align-center">
                            <div>
                                <h2 className="section-title">Student List</h2>
                                <p className="section-description">
                                    View and manage all students in this section
                                </p>
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setShowAddMarks(true)}
                                    disabled={students.length === 0}
                                >
                                    <FaChartBar />
                                    Add Marks
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleGrade}
                                    disabled={students.length === 0}
                                >
                                    <FaGraduationCap />
                                    Generate Grades
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <StudentList students={students} onDelete={handleDelete} />
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            {showAddMarks && (
                <AddMarksDialog
                    students={students}
                    onAddMarks={handleAddMarks}
                    onCancel={() => setShowAddMarks(false)}
                />
            )}
            {showWeightageDialog && (
                <GradeWeightageDialog
                    students={students}
                    onClose={() => setShowWeightageDialog(false)}
                    sectionId={sectionId}
                    onGradesGenerated={fetchStudents}
                />
            )}
        </div>
    );
};

export default SectionPage; 
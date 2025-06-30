import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import AddCourseDialog from '../components/AddCourseDialog';
import { getCourses, addCourse } from '../services/api';
import { FaGraduationCap, FaUsers, FaChartLine, FaPlus, FaSpinner, FaBookOpen } from 'react-icons/fa';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (newCourse) => {
        try {
            setError('');
            await addCourse(newCourse);
            await loadCourses(); // Reload courses to get the updated list
        } catch (error) {
            console.error('Error adding course:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">Academic Dashboard</h1>
                <p className="page-subtitle">
                    Welcome to Student Grading System. Manage your academic courses, student records, and grading processes efficiently.
                </p>
            </div>

            {/* Stats Section */}
            <div className="section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaGraduationCap className="stat-icon" />
                        <span className="stat-number">{courses.length}</span>
                        <span className="stat-label">Active Courses</span>
                    </div>
                    <div className="stat-card success">
                        <FaUsers className="stat-icon" />
                        <span className="stat-number">Academic</span>
                        <span className="stat-label">Management</span>
                    </div>
                    <div className="stat-card info">
                        <FaChartLine className="stat-icon" />
                        <span className="stat-number">Real-time</span>
                        <span className="stat-label">Grading</span>
                    </div>
                    <div className="stat-card warning">
                        <FaBookOpen className="stat-icon" />
                        <span className="stat-number">Professional</span>
                        <span className="stat-label">System</span>
                    </div>
                </div>
            </div>

            {/* Courses Section */}
            <div className="section">
                <div className="content-area">
                    <div className="content-header">
                        <div className="d-flex justify-between align-center">
                            <div>
                                <h2 className="section-title">Academic Courses</h2>
                                <p className="section-description">
                                    Select a course to manage students, grades, and academic records
                                </p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowAddDialog(true)}
                            >
                                <FaPlus />
                                Add Course
                            </button>
                        </div>
                    </div>

                    <div className="content-body">
                        {error && (
                            <div className="d-flex align-center gap-2 p-3 mb-4 bg-error text-white rounded">
                                <span>⚠</span>
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="empty-state">
                                <FaSpinner className="spinner" />
                                <h3 className="empty-state-title">Loading Courses</h3>
                                <p className="empty-state-description">
                                    Please wait while we fetch your academic courses...
                                </p>
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="empty-state">
                                <FaGraduationCap className="empty-state-icon" />
                                <h3 className="empty-state-title">No Courses Available</h3>
                                <p className="empty-state-description">
                                    Get started by adding your first academic course to begin managing students and grades.
                                </p>
                                <button
                                    className="btn btn-primary mt-4"
                                    onClick={() => setShowAddDialog(true)}
                                >
                                    <FaPlus />
                                    Add Your First Course
                                </button>
                            </div>
                        ) : (
                            <div className={styles.courseGrid}>
                                {courses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Course Dialog */}
            <AddCourseDialog
                isOpen={showAddDialog}
                onClose={() => {
                    setShowAddDialog(false);
                    setError('');
                }}
                onAdd={handleAddCourse}
            />
        </div>
    );
};

export default HomePage; 
import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styles from './AddCourseDialog.module.css';

const AddCourseDialog = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        section: '',
        maxStudents: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.courseCode.trim()) {
            newErrors.courseCode = 'Course code is required';
        } else if (formData.courseCode.length < 3) {
            newErrors.courseCode = 'Course code must be at least 3 characters';
        }

        if (!formData.courseName.trim()) {
            newErrors.courseName = 'Course name is required';
        }

        if (!formData.section.trim()) {
            newErrors.section = 'Section is required';
        } else if (formData.section.length < 1) {
            newErrors.section = 'Section must be at least 1 character';
        }

        if (formData.maxStudents && (isNaN(formData.maxStudents) || formData.maxStudents < 1)) {
            newErrors.maxStudents = 'Maximum students must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const newCourse = {
                id: Date.now().toString(),
                code: formData.courseCode.trim(),
                name: formData.courseName.trim(),
                section: formData.section.trim(),
                maxStudents: formData.maxStudents ? parseInt(formData.maxStudents) : null,
                createdAt: new Date().toISOString()
            };

            onAdd(newCourse);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            courseCode: '',
            courseName: '',
            section: '',
            maxStudents: ''
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Add New Course/Section</h2>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="courseCode">Course Code *</label>
                        <input
                            type="text"
                            id="courseCode"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleInputChange}
                            placeholder="e.g., CS101, MATH201"
                            className={`${styles.input} ${errors.courseCode ? styles.error : ''}`}
                        />
                        {errors.courseCode && <span className={styles.errorText}>{errors.courseCode}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="courseName">Course Name *</label>
                        <input
                            type="text"
                            id="courseName"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            placeholder="e.g., Introduction to Computer Science"
                            className={`${styles.input} ${errors.courseName ? styles.error : ''}`}
                        />
                        {errors.courseName && <span className={styles.errorText}>{errors.courseName}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="section">Section *</label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            placeholder="e.g., Section A, Morning Section"
                            className={`${styles.input} ${errors.section ? styles.error : ''}`}
                        />
                        {errors.section && <span className={styles.errorText}>{errors.section}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="maxStudents">Maximum Students</label>
                        <input
                            type="number"
                            id="maxStudents"
                            name="maxStudents"
                            value={formData.maxStudents}
                            onChange={handleInputChange}
                            placeholder="e.g., 30"
                            min="1"
                            className={`${styles.input} ${errors.maxStudents ? styles.error : ''}`}
                        />
                        {errors.maxStudents && <span className={styles.errorText}>{errors.maxStudents}</span>}
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={handleClose} className={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            <FaPlus />
                            Add Course/Section
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourseDialog; 
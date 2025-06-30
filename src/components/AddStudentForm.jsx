import React, { useState } from 'react';
import { FaUserPlus, FaUser, FaIdCard, FaSpinner } from 'react-icons/fa';
import styles from './AddStudentForm.module.css';

const AddStudentForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !rollNo.trim()) return;

        setIsSubmitting(true);
        try {
            await onAdd({ name: name.trim(), rollNo: rollNo.trim() });
            setName('');
            setRollNo('');
        } catch (error) {
            console.error('Error adding student:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaUser className={styles.inputIcon} />
                            Student Name
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter student's full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaIdCard className={styles.inputIcon} />
                            Roll Number
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Enter roll number"
                            value={rollNo}
                            onChange={e => setRollNo(e.target.value)}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !rollNo.trim()}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="spinner" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    Add Student
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddStudentForm; 
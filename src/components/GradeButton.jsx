import React from 'react';
import { FaAward, FaSpinner } from 'react-icons/fa';
import styles from './GradeButton.module.css';

const GradeButton = ({ onClick, loading }) => (
    <div className={styles.container}>
        <button
            className={`${styles.button} ${loading ? styles.loading : ''}`}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? (
                <>
                    <FaSpinner className={styles.spinner} />
                    <span>Generating Grades...</span>
                </>
            ) : (
                <>
                    <FaAward className={styles.icon} />
                    <span>Generate Grades</span>
                </>
            )}
        </button>
        <p className={styles.description}>
            Calculate final grades based on student marks and weightage
        </p>
    </div>
);

export default GradeButton; 
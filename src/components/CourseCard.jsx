import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaArrowRight, FaUsers, FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import styles from './CourseCard.module.css';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    // Handle both old string format and new object format
    const isOldFormat = typeof course === 'string';

    if (isOldFormat) {
        // Fallback for old format - navigate to section page
        return (
            <div className={styles.card} onClick={() => navigate(`/section/${course}`)}>
                <div className={styles.cardHeader}>
                    <div className={styles.icon}>
                        <FaChalkboardTeacher />
                    </div>
                    <div className={styles.statusBadge}>
                        <span>Active</span>
                    </div>
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.title}>{course}</h3>
                    <p className={styles.description}>Manage students and grades for this course</p>
                </div>
                <div className={styles.cardFooter}>
                    <span className={styles.action}>
                        View Section
                        <FaArrowRight className={styles.arrowIcon} />
                    </span>
                </div>
            </div>
        );
    }

    // New format with course object - navigate to section page using course code
    return (
        <div className={styles.card} onClick={() => navigate(`/section/${course.code}`)}>
            <div className={styles.cardHeader}>
                <div className={styles.icon}>
                    <FaBookOpen />
                </div>
                <div className={styles.statusBadge}>
                    <span>Active</span>
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.courseCode}>{course.code}</div>
                <h3 className={styles.title}>{course.name}</h3>
                <div className={styles.sectionInfo}>
                    <span className={styles.sectionBadge}>
                        <FaGraduationCap className={styles.badgeIcon} />
                        Section {course.section}
                    </span>
                </div>
                <div className={styles.courseDetails}>
                    {course.maxStudents && (
                        <div className={styles.detail}>
                            <FaUsers className={styles.detailIcon} />
                            <span>Max: {course.maxStudents} students</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.cardFooter}>
                <span className={styles.action}>
                    View Section
                    <FaArrowRight className={styles.arrowIcon} />
                </span>
            </div>
        </div>
    );
};

export default CourseCard; 
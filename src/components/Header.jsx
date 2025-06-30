import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaSignOutAlt, FaUserGraduate } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <div className={styles.logoText}>
                        <h1 className={styles.title}>Student Grading System</h1>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <Link
                        to="/"
                        className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                    >
                        <FaHome className={styles.navIcon} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/"
                        className={`${styles.navLink} ${location.pathname.includes('/section') ? styles.active : ''}`}
                    >
                        <FaUsers className={styles.navIcon} />
                        <span>Sections</span>
                    </Link>
                    <div className={styles.userInfo}>
                        <FaUserGraduate className={styles.userIcon} />
                        <span className={styles.userEmail}>
                            {localStorage.getItem('userEmail') || 'Faculty Member'}
                        </span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        <FaSignOutAlt className={styles.navIcon} />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header; 
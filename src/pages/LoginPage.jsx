import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validate credentials
        if (email === 'murtaza@gmail.com' && password === 'Murtaza123') {
            // Store login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            navigate('/');
        } else {
            setError('Invalid email or password. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.backgroundPattern}></div>

            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.logoSection}>

                        <div className={styles.brandText}>
                            <h1>Student Grading System</h1>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <h2>Faculty Login</h2>
                    <p>Access the academic management portal</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address (e.g. murtaza@gmail.com)"
                                required
                                className={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password (e.g. Murtaza123)"
                                required
                                className={styles.input}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className={styles.errorMessage}>
                            <span className={styles.errorIcon}>⚠</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className={styles.spinner} />
                                Signing in...
                            </>
                        ) : (
                            <>
                                <FaGraduationCap />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 
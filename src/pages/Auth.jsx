// src/pages/Auth.js
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth() {
    const { currentUser, login, signup, signupSuccess, setSignupSuccess } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
                // After successful signup, switch to login form
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="app-logo">
                    <div className="logo-circle">S</div>
                    <h1>SocialSphere</h1>
                </div>

                {signupSuccess && (
                    <div className="success-message">
                        <i className="fas fa-check-circle"></i>
                        Account created successfully! Please log in.
                    </div>
                )}

                <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
                <p className="subtitle">
                    {isLogin
                        ? 'Sign in to continue to your social space'
                        : 'Join our community to start sharing'}
                </p>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="spinner"></div>
                        ) : isLogin ? (
                            'Sign In'
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="auth-switch">
                    <p>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <span onClick={() => {
                            setSignupSuccess(false);
                            setIsLogin(!isLogin);
                            setError('');
                        }}>
                            {isLogin ? ' Sign Up' : ' Sign In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
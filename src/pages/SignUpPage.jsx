import { useState } from "react";
import apiService from "../data/apiService";
import { ErrorBar } from "../components/StatusBar";
import { USER_ID_KEY } from "../data/config";

const SignUpPage = () => {
    const [credential, setCredential] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await apiService.signUpUser(credential);
            if (res?.id) {
                localStorage.setItem(USER_ID_KEY, res.id);
            }

            alert("User created");
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            const errorMessage = 
                typeof error.response?.data === 'string'
                    ? error.response.data
                    : error.response?.data?.message || error.message || 'Login failed! Please try again.';

            setError(String(errorMessage));
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section id="sign-up" className="auth">
                <h1>Sign Up</h1>

                {error && <ErrorBar text={error} />}

                <form onSubmit={handleSubmit}>
                    <div className="input-label">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credential.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-label">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={credential.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-label">
                        <label htmlFor="password">Password</label>
                        <div className="input-field-password">
                            <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={credential.password}
                            onChange={handleChange}
                            required />
                            
                            <label className="toogle-password">
                                <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}/>
                                <span style={{ fontSize: "14px" }}>Show password</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>

                    <p style={{ textAlign: "center" }}>Already have account? Go to <a href="/login" className="link">Login</a></p>
                </form>
            </section>
        </>
    );
};

export default SignUpPage;
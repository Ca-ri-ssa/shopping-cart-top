import { ErrorBar, LoadingBar } from "../components/StatusBar";
import apiService from "../data/apiService";
import { USER_ID_KEY } from "../data/config";
import { useState } from "react";

const getUserId = async (username) => {
    try {
        const res = await apiService.getAllUser();
        const user = res.find(u => u.username ===  username);
        return user ? user.id : null;
    } catch (error) {
        console.error(error);
        return null;
    };
};

const LoginPage = () => {
    const [credential, setCredential] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            await apiService.loginUser(credential);

            const userId = await getUserId(credential.username);
            if(!userId) {
                setError("User id could not be found");
                setLoading(false);
                return;
            }

            localStorage.setItem(USER_ID_KEY, userId);

            alert("Login Success");
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
            <section id="login">
                <h1>Login</h1>

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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credential.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p style={{ textAlign: "center" }}>Don't have account? let's <a href="/signup">Sign Up</a></p>
                </form>
            </section>
        </>
    )
};

export default LoginPage;
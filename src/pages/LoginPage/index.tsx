import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/auth/useAuth';
import { useMountEffect } from 'hooks/common/useMountEffect';

export const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { requestLogin } = useAuth();
    const history = useHistory();

    useMountEffect(() => history.push('/login'));

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        requestLogin({ login, password });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Login</h2>
                    <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                </label>
                <label>
                    <h2>Password</h2>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                </label>
                <button type="submit">Submit</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}

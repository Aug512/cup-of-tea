import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/auth/useAuth';

export const RegisterPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { createUser } = useAuth();

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        createUser({ login, password, name });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Register</h2>
                    <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" />
                </label>
                <label>
                    <h2>Password</h2>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                </label>
                <label>
                    <h2>Name</h2>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </label>
                <button type="submit">Submit</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

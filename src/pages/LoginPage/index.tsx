import React, { FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from 'hooks/auth/useAuth';
import { useMountEffect } from 'hooks/common/useMountEffect';

import { TextInput } from 'components/TextInput';
import { Button } from 'components/Button';

import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { requestLogin } = useAuth();
    const history = useHistory();

    // useMountEffect(() => history.push('/login'));

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        requestLogin({ login, password });
    };

    const handleRegClick = useCallback(() => {
        history.push('/register');
    }, [history]);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.inputRow}>
                    <h2 className={styles.title}>Email</h2>
                    <TextInput className={styles.input} placeholder="Email" value={login} onChange={setLogin} />
                </label>
                <label className={styles.inputRow}>
                    <h2 className={styles.title}>Пароль</h2>
                    <TextInput className={styles.input} placeholder="Пароль" value={password} onChange={setPassword} />
                </label>
                <div className={styles.actions}>
                    <Button className={styles.button} type="submit">Войти</Button>
                    <Button className={styles.button} view="secondary" onClick={handleRegClick}>Зарегистрироваться</Button>
                </div>
            </form>
        </div>
    )
}

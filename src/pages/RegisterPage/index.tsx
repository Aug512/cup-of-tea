import React, { FormEvent, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from 'hooks/auth/useAuth';

import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';

import styles from './RegisterPage.module.css';

export const RegisterPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { createUser } = useAuth();
    const history = useHistory();

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        createUser({ login, password, name });
    };

    const handleLoginClick = useCallback(() => {
        history.push('/login');
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
                <label className={styles.inputRow}>
                    <h2 className={styles.title}>Имя пользователя</h2>
                    <TextInput className={styles.input} placeholder="Имя пользователя" value={name} onChange={setName} />
                </label>
                <div className={styles.actions}>
                    <Button className={styles.button} type="submit">Зарегистрироваться</Button>
                    <Button className={styles.button} view="secondary" onClick={handleLoginClick}>Войти</Button>
                </div>
            </form>
        </div>
    )
}

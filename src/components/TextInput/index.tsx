import React, { ChangeEventHandler } from 'react';
import cn from 'classnames';

import styles from './TextInput.module.css';

interface ITextInputProps {
    className?: string;
    value: string;
    name?: string;
    id?: string;
    placeholder?: string;
    onChange: (text: string) => void;
}

export const TextInput: React.FC<ITextInputProps> = (props) => {
    const { value, onChange, placeholder, className, name, id } = props;
    const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
        const value = evt.target.value;
        onChange(value);
    }

    return (
        <input
            type="text"
            name={name} 
            id={id}
            placeholder={placeholder ?? ''}
            value={value}
            onChange={handleChange}
            className={cn(styles.input, className)}
        />
    )
}

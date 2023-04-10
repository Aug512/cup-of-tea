import React, { ChangeEventHandler } from 'react';
import cn from 'classnames';

import styles from './TextArea.module.css';

interface ITextAreaProps {
    className?: string;
    value: string;
    name?: string;
    id?: string;
    placeholder?: string;
    onChange: (text: string) => void;
}

export const TextArea: React.FC<ITextAreaProps> = (props) => {
    const { value, onChange, placeholder, className, name, id } = props;

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        const value = evt.target.value;
        onChange(value);
    }

    return (
        <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            className={cn(styles.textarea, className)}
        />
    )
}

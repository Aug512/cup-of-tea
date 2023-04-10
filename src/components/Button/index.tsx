import React from 'react';
import cn from 'classnames';

import styles from './Button.module.css';

interface IButtonProps {
    className?: string;
    type?: 'button' | 'submit';
    view?: 'primary' | 'secondary';
    name?: string;
    id?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
    const { type = 'button', view = 'primary', onClick, children, className, name, id } = props;

    return (
        <button
            type={type}
            name={name} 
            id={id}
            onClick={onClick}
            className={cn(styles.button, styles[view], className)}
        >
            {children}
        </button>
    )
}

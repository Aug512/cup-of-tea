import React from 'react';
import cn from 'classnames';

import styles from './Tumbler.module.css';

interface ITumblerProps {
    className?: string;
    name?: string;
    id?: string;
    value: boolean;
    onToggle: () => void;
}

export const Tumbler: React.FC<ITumblerProps> = (props) => {
    const { onToggle, value, className, name, id } = props;

    const handleChange = () => {
        onToggle();
    }

    return (
        <>
            <input
                type='checkbox'
                checked={value}
                name={name} 
                id={id}
                onChange={handleChange}
                className={styles.native}
            />
            <div className={cn(styles.tumbler, { [styles.checked]: value }, className)}>
                <div className={styles.circle} />
            </div>
        </>
    )
}

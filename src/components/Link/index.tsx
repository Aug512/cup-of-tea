import React from 'react';
import cn from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Link.module.css';

interface ILinkProps {
    className?: string;
    id?: string;
    target?: '_blank' | '_self';
    to: `/${string}`;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const Link: React.FC<ILinkProps> = (props) => {
    const { onClick, to, className, target, id, children } = props;

    return (
        <RouterLink
            to={to}
            target={target} 
            id={id}
            onClick={onClick}
            className={cn(styles.link, className)}
        >
            {children}
        </RouterLink>
    )
}

import React from 'react';
import cn from 'classnames';

import styles from './ContentWrapper.module.css';

interface IContentWrapperProps {
    className?: string;
    children: React.ReactNode;
}

export const ContentWrapper: React.FC<IContentWrapperProps> = ({ className, children }) => {
    return <div className={cn(styles.wrapper, className)}>{children}</div>;
}

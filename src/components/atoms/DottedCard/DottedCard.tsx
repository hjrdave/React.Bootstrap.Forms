import React from 'react';
import styles from './DottedCard.module.scss';

interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string;
    onClick?: () => void;
}

export default function DottedCard({ children, className, onClick }: Props) {

    return (
        <>
            <div className={`${styles.compContainer} ${className}`} onClick={onClick}>
                {children}
            </div>
        </>
    )
}
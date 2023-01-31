import React from 'react';
//import styles from './listItemChildren.module.scss';

interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

export default function ListItemChildren({ children, className }: Props) {

    return (
        <>
            <div className={`styles.compContainer} ${className}`}>
                {children}
            </div>
        </>
    )
}
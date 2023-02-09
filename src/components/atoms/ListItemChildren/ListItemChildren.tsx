import React from 'react';

interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

export default function ListItemChildren({ children, className }: Props) {

    return (
        <>
            <div className={`${className}`} style={{ width: '100%' }}>
                {children}
            </div>
        </>
    )
}
import React from 'react';
import { Dropdown } from 'react-bootstrap';
//import styles from './listItemDropdown.module.scss';

interface Props {
    className?: string;
    children?: JSX.Element | JSX.Element[];
    style?: React.CSSProperties;
    maxHeight?: string;
    flushMenu?: boolean;
    tabIndex?: number;
}

export default function ListItemDropdown({ maxHeight, className, children, flushMenu, tabIndex }: Props) {

    const isFlushMenu = (flushMenu) ? {
        modifiers: [{
            name: 'offset',
            enabled: true,
            options: {
                offset: [0, -1]
            }
        }]
    } : undefined

    return (
        <>
            <Dropdown.Menu
                style={{ maxHeight: maxHeight, overflowY: 'auto' }}
                className={`styles.compContainer} ${className}`}
                popperConfig={isFlushMenu}
                tabIndex={tabIndex}
            >
                {children}
            </Dropdown.Menu>
        </>
    )
}
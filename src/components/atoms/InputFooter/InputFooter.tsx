import React from 'react';
import { Dropdown } from 'react-bootstrap';
//import styles from './inputFooter.module.scss';

interface Props {
    children?: JSX.Element[] | JSX.Element;
}

export default function InputFooter({ children }: Props) {

    return (
        <>
            <Dropdown.ItemText className={`styles.compContainer} d-flex align-items-center py-3`}>
                {children}
            </Dropdown.ItemText>
        </>
    )
}
import React from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
//import styles from './inputLoading.module.scss';

export default function InputLoading() {

    return (
        <>
            <Dropdown.ItemText className='d-flex align-items-center'>
                <span><Spinner className={`styles.spinnerIcon} me-2`} animation={'border'} variant={'primary'} />{'Loading...'}</span>
            </Dropdown.ItemText>
        </>
    )
}
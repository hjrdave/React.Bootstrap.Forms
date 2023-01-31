import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useString } from 'react-cork';

interface Props {
    error?: string | boolean | object | null;
}
export default function InputError({ error }: Props) {
    const string = useString();

    return (
        <>
            <Dropdown.ItemText className='d-flex align-items-center'>
                <span>
                    <i className="fas fa-exclamation-triangle text-danger pe-2"></i>
                    {(typeof error === 'string') ? string.trunicate(error, 75) : 'Fetch Error'}</span>
            </Dropdown.ItemText>
        </>
    )
}
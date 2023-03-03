import React from 'react';
import { Form } from 'react-bootstrap';
import CheckProps from './CheckProps';

export default function Check(props: CheckProps) {

    return (
        <>
            <Form.Check
                {...props}
                onChange={(e: any) => props.onChange?.(e)}
            />
        </>
    )
}
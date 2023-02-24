import React from 'react';
import { Button } from 'react-bootstrap';
import IForm from '../../../IForm';

interface Props extends IForm.BaseButtonProps { };

export default function Reset({ children, onClick, ...props }: Props) {

    return (
        <>
            <Button type={'reset'} {...props}>
                {(children) ? children : 'Reset'}
            </Button>
        </>
    )
}
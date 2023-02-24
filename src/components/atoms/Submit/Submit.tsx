import React from 'react';
import { Button } from 'react-bootstrap';
import IForm from '../../../IForm';

interface Props extends IForm.BaseButtonProps { };

export default function Submit({ children, onClick, ...props }: Props) {

    return (
        <>
            <Button type={'submit'} {...props}>
                {(children) ? children : 'Submit'}
            </Button>
        </>
    )
}
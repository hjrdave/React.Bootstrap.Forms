import React from 'react';
import { useNonInitialEffect } from 'react-cork';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';

interface Props extends FormControlProps { };

export default function Text({ value, name, onChange, debounceTime, ...props }: Props) {

    const controlId = 'text';
    const _name = name;
    const { controlValue, setControlValue, bind } = useControlledInput(value, onChange, debounceTime);

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);


    return (
        <>
            <FormControl
                {...props}
                name={_name}
            />
        </>
    )
}
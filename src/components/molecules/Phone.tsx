import React from 'react';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';
import { useNonInitialEffect } from 'react-cork';

interface Props extends FormControlProps {
    value?: string;
};

export default function Phone({ value, name, onChange, placeholder, debounceTime, ...props }: Props) {

    const controlId = 'Phone';
    const _name = name;
    const { controlValue, setControlValue, bind } = useControlledInput(value, onChange, debounceTime);

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);

    return (
        <>
            <FormControl
                {...props}
                {...bind}
                name={_name}
                placeholder={placeholder ?? '___-___-____'}
            />
        </>
    )
}
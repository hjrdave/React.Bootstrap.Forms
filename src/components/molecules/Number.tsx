import React from 'react';
import { useNonInitialEffect } from 'react-cork';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';
interface Props extends FormControlProps {
    value?: number;
    defaultValue?: number;
};

export default function Number({ name, value, onChange, debounceTime, ...props }: Props) {

    const controlId = 'number';
    const _name = name;
    const { controlValue, setControlValue, bind } = useControlledInput(value, onChange, debounceTime);

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);


    return (
        <>
            <FormControl
                {...props}
                type={'number'}
                name={_name}
            />
        </>
    )
}
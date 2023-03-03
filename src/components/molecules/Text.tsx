import React from 'react';
import { useNonInitialEffect } from 'react-cork';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';

interface Props extends FormControlProps { };

export default function Text({ value, name, onChange, debounceTime, persist, ...props }: Props) {

    const controlId = 'text';
    const _name = name;
    const { controlValue, setControlValue, bind } = useControlledInput({
        name: name,
        inputValue: value,
        onChange: onChange,
        debounceTime: debounceTime,
        persistValue: persist
    });

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);


    return (
        <>
            <FormControl
                {...props}
                {...bind}
                name={_name}
            />
        </>
    )
}
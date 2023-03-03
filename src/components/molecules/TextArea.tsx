import React from 'react';
import { useNonInitialEffect } from 'react-cork';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';

interface Props extends FormControlProps {

};

export default function TextArea({ value, name, required, onChange, debounceTime, persist, ...props }: Props) {

    const controlId = 'textarea';
    const _name = name;
    const [_value, _setValue] = React.useState(value);
    const { controlValue, setControlValue, bind } = useControlledInput({
        name: name,
        inputValue: value,
        onChange: onChange,
        debounceTime: debounceTime
    });

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);

    return (
        <>
            <FormControl
                {...props}
                as={'textarea'}
                name={_name}
                value={_value}
            />
        </>
    )
}
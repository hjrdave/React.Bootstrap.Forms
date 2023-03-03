/**Cannot get the pattern to work */
import React from 'react';
import { useNonInitialEffect } from 'react-cork';
import FormControl, { FormControlProps } from '../atoms/FormControl';
import useControlledInput from '../../hooks/useControlledInput';

interface Props extends FormControlProps {
    defaultValue?: string;
    value?: string;
};

export default function Email({ name, placeholder, pattern, onChange, value, debounceTime, ...props }: Props) {

    const controlId = 'email';
    const _name = name;
    const [_placeholder] = React.useState((placeholder ?? "Type email"));
    const defaultEmailRegex = pattern ?? new RegExp(/^\s*([^\s@]+)@([^\s@]+)\.([^\s@]+)\s*$/
    );
    const { controlValue, setControlValue, bind } = useControlledInput(value, onChange, debounceTime);

    useNonInitialEffect(() => {
        setControlValue(controlValue);
    }, [controlValue]);
    return (
        <>
            <FormControl
                {...props}
                name={_name}
                placeholder={_placeholder}
                pattern={defaultEmailRegex}
            />
        </>
    )
}
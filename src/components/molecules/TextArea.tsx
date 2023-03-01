import React from 'react';
import FormControl, { FormControlProps } from '../atoms/FormControl';

interface Props extends FormControlProps {

};

export default function TextArea({ value, name, required, label, ...props }: Props) {

    const controlId = 'textarea';
    const _name = name;
    const [_value, _setValue] = React.useState(value);


    return (
        <>
            <FormControl
                {...props}
                as={'textarea'}
                name={_name}
                label={(required) ? `${label} *` : label}
                value={_value}
            />
        </>
    )
}
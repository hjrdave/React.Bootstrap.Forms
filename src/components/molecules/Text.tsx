import React from 'react';
import FormControl, { FormControlProps } from '../atoms/FormControl';

interface Props extends FormControlProps { };

export default function Text({ value, name, required, label, ...props }: Props) {

    const controlId = 'text';
    const _name = name;
    const [_value, _setValue] = React.useState(value);


    return (
        <>
            <FormControl
                {...props}
                name={_name}
                label={(required) ? `${label} *` : label}
                value={_value}
            />
        </>
    )
}
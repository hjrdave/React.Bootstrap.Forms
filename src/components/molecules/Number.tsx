import React from 'react';
import FormControl, { FormControlProps } from '../atoms/FormControl';

interface Props extends FormControlProps {
    value?: number;
    defaultValue?: number;
};

export default function Number({ defaultValue, name, required, label, ...props }: Props) {

    const controlId = 'number';
    const _name = name;
    const [_defaultValue, _setDefaultValue] = React.useState<number>(defaultValue ?? 0);


    return (
        <>
            <FormControl
                {...props}
                type={'number'}
                name={_name}
                label={(required) ? `${label} *` : label}
                defaultValue={_defaultValue}
            />
        </>
    )
}
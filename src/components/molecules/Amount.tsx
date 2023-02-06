import React from 'react';
import NumberInput from './Number';

interface Props {
    name: string;
    label: string;
    hideLabel?: boolean;
    min?: number;
    max?: number;
    value?: number;
};

export default function Amount(props: Props) {

    return (
        <>
            <NumberInput
                {...props}
                icon={<i className="fa-solid fa-dollar-sign"></i>}
                float={2}
            />
        </>
    )
}
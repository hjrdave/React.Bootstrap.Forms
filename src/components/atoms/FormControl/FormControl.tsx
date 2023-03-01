import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import FormControlProps from './FormControlProps';
import useDebounce from 'react-cork/useDebounce';

export default function FormControl({ className, label, htmlFor, ariaDescribedby, caption, captionId, appendControl, prependControl, ariaLabel, onChange, debounceTime, maxLength, ...props }: FormControlProps) {

    const _onChange = useDebounce(onChange, (debounceTime ?? 200));

    return (
        <>
            <Form.Label
                htmlFor={htmlFor}
            >
                {label}
            </Form.Label>
            <InputGroup
                className={className}
            >
                <>
                    {(prependControl) ? <>{prependControl}</> : <></>}
                    <Form.Control
                        {...props}
                        aria-label={ariaLabel}
                        aria-describedby={ariaDescribedby}
                        onChange={_onChange}
                        maxLength={maxLength ?? 255}
                    />
                    {(appendControl) ? <>{appendControl}</> : <></>}
                </>
            </InputGroup>
            <Form.Text
                id={captionId}
                muted
            >
                {caption}
            </Form.Text>
        </>
    )
}
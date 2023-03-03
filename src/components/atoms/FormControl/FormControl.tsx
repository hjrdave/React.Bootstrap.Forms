import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import FormControlProps from './FormControlProps';

export default function FormControl({ className, label, htmlFor, ariaDescribedby, caption, captionId, appendControl, prependControl, ariaLabel, maxLength, required, ...props }: FormControlProps) {

    return (
        <>
            <Form.Group>
                <Form.Label
                    htmlFor={htmlFor}
                >
                    {(required) ? `${label} *` : label}
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
                            maxLength={maxLength ?? 255}
                            required={required}
                        />
                        {(appendControl) ? <>{appendControl}</> : <></>}
                    </>
                    <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>Does Not look good</Form.Control.Feedback>
                </InputGroup>
                <Form.Text
                    id={captionId}
                    muted
                >
                    {caption}
                </Form.Text>
            </Form.Group>
        </>
    )
}
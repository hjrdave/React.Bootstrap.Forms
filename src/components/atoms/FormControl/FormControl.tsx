import React from 'react';
import { Form } from 'react-bootstrap';
import FormControlProps from './FormControlProps';

export default function FormControl({ className, controlId, label, htmlFor, ariaDescribedby, caption, captionId, appendControl: AppendControl, prependControl: PrependControl, ariaLabel, ...props }: FormControlProps) {

    return (
        <>
            <Form.Label htmlFor={htmlFor}>{label}</Form.Label>
            <Form.Group className={className} controlId={controlId}>
                {(PrependControl) ? <PrependControl /> : null}
                <Form.Control aria-label={ariaLabel} aria-describedby={ariaDescribedby} {...props} />
                {(AppendControl) ? <AppendControl /> : null}
            </Form.Group>
            <Form.Text id={captionId} muted>
                {caption}
            </Form.Text>
        </>
    )
}
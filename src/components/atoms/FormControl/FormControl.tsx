import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface Props {
    name: string;
    label?: string | JSX.Element;
    labelPosition?: 'top' | 'column';
    className?: string;
    placeholder?: string;
    type?: string;
    ref?: any;
    id?: string;
    as?: 'input' | 'textarea' | React.ElementType;
    disabled?: boolean;
    htmlSize?: number;
    isInvalid?: boolean;
    isValid?: boolean;
    onChange?: (e: any) => void;
    plaintext?: boolean;
    readOnly?: boolean;
    value?: string | any[] | number;
    controlId: string;
    htmlFor?: string;
    bsPrefix?: string;
    size?: 'sm' | 'lg';
    ariaDescribedby?: string;
    ariaLabel?: string;
    caption?: string;
    captionId?: string;
    hasValidation?: boolean;
    appendControl?: (props: { [key: string]: any }) => JSX.Element;
    prependControl?: (props: { [key: string]: any }) => JSX.Element;
    tabIndex?: number;
};
export default function FormControl({ className, controlId, label, htmlFor, ariaDescribedby, caption, captionId, appendControl: AppendControl, prependControl: PrependControl, ariaLabel, ...props }: Props) {

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
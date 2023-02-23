import React from "react";
import { Form } from "react-bootstrap";
import RangeProps from "./RangeProps";

export default function Range({ label, labelClassName, ...props }: RangeProps) {

    return (
        <>
            <Form.Label className={labelClassName}>{labelClassName}</Form.Label>
            <Form.Range {...props} />
        </>
    )
}
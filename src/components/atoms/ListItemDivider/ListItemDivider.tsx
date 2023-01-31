import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface Props {
    className?: string;
    style?: React.HTMLAttributes<HTMLParagraphElement> | React.CSSProperties
}
export default function ListItemDivider({ className, style }: Props) {
    return (
        <>
            <Dropdown.Divider className={className} style={style} />
        </>
    )
}
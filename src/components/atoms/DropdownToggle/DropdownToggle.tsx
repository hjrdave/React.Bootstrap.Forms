import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DropdownProps } from 'react-bootstrap';

interface Props extends DropdownProps {
    toggleAs: JSX.Element;
}

export default function DropdownToggle({ toggleAs, id, children, ...props }: Props) {

    const CustomToggle = React.forwardRef(({ children, onClick }: { children: JSX.Element, onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }, ref: React.ForwardedRef<HTMLDivElement>) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </div>
    ));

    return (
        <>
            <Dropdown {...props}>
                <Dropdown.Toggle id={id} as={CustomToggle}>
                    Dropdown Button
                </Dropdown.Toggle>
                {children}
            </Dropdown>
        </>
    )
}
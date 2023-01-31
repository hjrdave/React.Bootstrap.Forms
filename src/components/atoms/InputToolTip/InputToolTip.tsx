import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface Props {
    message?: string;
    children?: JSX.Element;
}

export default function InputToolTip({ message, children }: Props) {
    return (
        <>
            <Dropdown.ItemText className={`pb-2 d-flex align-items-center `}>
                {
                    (children) ?
                        children :
                        <span>
                            <i className="fa-solid fa-circle-info pe-2" style={{ fontSize: '1.2rem' }}></i>
                            {message}
                            {/* {(message) ? message : i18n.translateThis('Sorry, No Results', i18n.localize.sorryNoResults)} */}
                        </span>
                }
            </Dropdown.ItemText>
        </>
    )
}
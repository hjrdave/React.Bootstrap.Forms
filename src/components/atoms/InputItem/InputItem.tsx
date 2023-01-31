

import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { IInputItem } from './interfaces';
//import styles from './inputItem.module.scss';

interface Props {
    item: IInputItem.Item;
    active?: boolean;
    setActiveItem?: React.Dispatch<React.SetStateAction<IInputItem.Item | undefined>>;
    as?: (props: { item: IInputItem.Item, [key: string]: any }) => JSX.Element;
    onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onKeyDown?: (e?: any) => void;
    tabIndex: number;
    text?: string;
    className?: string;
}

export default function InputItem({ item, text, active, tabIndex, as: CustomItem, onClick, onKeyDown, className }: Props) {

    const onClickFN = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (onClick) {
            onClick(e);
        }
    }
    const onKeyDownFN = (e: any) => {
        e.persist();
        const preventFormDefaults = () => { e?.preventDefault(); e?.stopPropagation(); };
        if (e.keyCode === 13) {
            if (onKeyDown) {
                onKeyDown();
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
            preventFormDefaults();
        }

    }

    return (
        <>
            <Dropdown.Item
                eventKey={tabIndex.toString()}
                tabIndex={tabIndex}
                as={'div'}
                className={`py-2 cursor styles.compContainer} ${className}`}
                active={active}
                onClick={onClickFN}
                onKeyDown={onKeyDownFN}
            >
                {
                    (CustomItem) ? <CustomItem item={item} /> : text
                }
            </Dropdown.Item>
        </>
    )
}
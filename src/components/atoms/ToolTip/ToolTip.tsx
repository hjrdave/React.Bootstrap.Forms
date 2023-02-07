import React from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import styles from './ToolTip.module.scss';

interface Props {
    variant?: 'label' | 'info';
    children?: JSX.Element | JSX.Element[];
    placement?: 'top' | 'right' | 'bottom' | 'left';
    overlay?: string | JSX.Element;
    className?: string;
}
export default function ToolTip({ children, placement, overlay, variant, className }: Props) {

    const id = `rbf_tooltip_${Math.random()}`;

    return (
        <>
            <OverlayTrigger
                key={(placement) ? placement : 'right'}
                placement={`${(placement) ? placement : 'right'}` as any}
                overlay={
                    (variant === 'info') ?
                        <Popover id={id}>
                            <Popover.Body>
                                {
                                    (overlay) ? overlay :
                                        <>
                                            <p className='mb-0'><strong>Tool Tip Info Title</strong></p>
                                            <p className='mb-0'>This is a Tool Tip Info blob</p>
                                        </>
                                }
                            </Popover.Body>
                        </Popover> :
                        <Tooltip id={id}>
                            {
                                (overlay) ? overlay : <p className='mb-0'>This is a Tool Tip Label</p>
                            }
                        </Tooltip>
                }
                children={((children) ? children : <i className={`fas fa-info-circle text-dark cursor ${styles.icon} ${className}`}></i>) as any}
            />
        </>
    )
}
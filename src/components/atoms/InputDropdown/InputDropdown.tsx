import React from 'react';
import ListItemChildren from '../ListItemChildren';
import ListItemDropdown from '../ListItemDropdown';
import InputLoading from '../InputLoading';
import InputError from '../InputError';
import InputToolTip from '../InputToolTip';
import InputFooter from '../InputFooter';
//import styles from './inputDropdown.module.scss';

interface Props {
    children?: JSX.Element | JSX.Element[];
    className?: string;
    childrenClassName?: string;
    withInputIcon?: boolean;
    loading?: boolean;
    error?: boolean | null | object | string;
    toolTip?: string;
    showChildren?: boolean;
    customFooter?: (props: any) => JSX.Element;
    maxHeight?: string;
    flushMenu?: boolean;
    tabIndex?: number;
}
export default function InputDropdown({ maxHeight, children, className, withInputIcon, customFooter: CustomFooter, error, loading, showChildren, childrenClassName, toolTip, flushMenu, tabIndex }: Props) {

    return (
        <>
            <ListItemDropdown maxHeight={maxHeight} className={`${(withInputIcon) ? /*styles.withIcon*/'' : ''} ${className} `} flushMenu={flushMenu} tabIndex={tabIndex}>
                {
                    (loading) ? <InputLoading /> :
                        (error) ? <InputError error={error} /> :
                            (showChildren !== false) ?
                                <>
                                    <ListItemChildren className={`${childrenClassName}`}>
                                        {children}
                                    </ListItemChildren>
                                    {
                                        (CustomFooter) ?
                                            <InputFooter>
                                                <CustomFooter />
                                            </InputFooter> : null
                                    }
                                </> :
                                <>
                                    <InputToolTip message={toolTip} />
                                    {
                                        (CustomFooter) ?
                                            <InputFooter>
                                                <CustomFooter />
                                            </InputFooter> : null
                                    }
                                </>
                }
            </ListItemDropdown>
        </>
    )
}
import React from 'react';
import { Button } from 'react-bootstrap';
//import useForm from '../use-form';

interface Props {
    onClick?: () => boolean;
    className?: string;
    //small?: boolean;
    disabled?: boolean;
    // hideReset?: boolean;
    label?: string;
    tabIndex?: number;
    icon?: JSX.Element;
}
export default function Submit({ onClick, className, disabled, label, icon, tabIndex }: Props) {

    //const form = useForm();
    //const i18n = useI18N();
    const _onClick = () => {
        if (onClick) {
            onClick();
        }
        //this sets all control data to updated = false.
        //form.clearUpdatedFormData();
    };
    //const tabIndex = form.controlData.length + 1;
    //const isDisabled = (form.loading) ? true : (form.readOnly) ? true : (disabled) ? true : (form.isSubmitBtnDisabled) ? true : false;

    return (
        <>
            <div className={className}>
                {/* {
                    (!hideReset) ?
                        <Button.Link
                            onClick={form.reset}
                            label={i18n.localize.reset}
                            disabled={isDisabled}
                        /> : null
                } */}
                <Button
                    type={'submit'}
                    onClick={_onClick}
                    disabled={disabled}
                    tabIndex={tabIndex}
                >
                    {(icon) ? icon : <i className="fas fa-save pe-2"></i>}
                    {(label) ? label : 'Submit'}
                </Button>
            </div>
        </>
    )
}
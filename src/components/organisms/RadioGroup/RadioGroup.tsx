import React from 'react';
import { withTreble } from 'treble-gsm';
import Form from 'react-bootstrap/Form';
//import ToolTip from '../../../atoms/tool-tip';
import Store from './Store';
import useRadioGroup from './use-radio-group';
import useForm from '../../../use-form';
import { useCleanupEffect, useNonInitialEffect } from 'react-cork';
import useFormGroup from '../Group/use-form-group';
//import styles from '../form.module.scss';

interface Props {
    name: string;
    children?: JSX.Element | JSX.Element[];
    onChange?: (value?: { text?: string | React.ReactNode, value: any }) => void;
    readOnly?: boolean;
    required?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    className?: string;
    label?: string | React.ReactNode;
    toolTip?: JSX.Element | string;
    activeChecked?: { text?: string | React.ReactNode, value: any };
    highlightMissing?: boolean;
    tabIndex?: number;
}
function GroupComp({ children, name, onChange, readOnly: disabled, required, isInvalid, isValid, className, activeChecked, label, toolTip, highlightMissing, tabIndex: _tabIndex }: Props) {

    const controlType = 'radio';
    const form = useForm();
    const radioGroup = useRadioGroup();
    const formGroup = useFormGroup();
    const [isMounted, setIsMounted] = React.useState(false);
    const highlightDanger = (!(radioGroup.value) && highlightMissing) ? true : false;
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);

    React.useEffect(() => {
        if (typeof tabIndex === 'number') {
            radioGroup.setTabIndex(tabIndex);
        }
    }, [tabIndex]);

    React.useEffect(() => {
        radioGroup.setName(name);
    }, []);

    React.useEffect(() => {
        if (disabled !== undefined) {
            radioGroup.setIsDisabled(disabled);
        }
    }, [disabled]);

    React.useEffect(() => {
        if (required !== undefined) {
            radioGroup.setRequired(required);
        }
    }, [required]);

    React.useEffect(() => {
        if (isInvalid !== undefined) {
            radioGroup.setIsInvalid(isInvalid);
        }
    }, [isInvalid]);

    React.useEffect(() => {
        if (isValid !== undefined) {
            radioGroup.setIsValid(isValid);
        }
    }, [isValid]);

    React.useEffect(() => {
        if (highlightMissing !== undefined) {
            radioGroup.setHighlightMissing(highlightMissing);
        }
    }, [highlightMissing]);

    React.useEffect(() => {
        if (onChange) {
            onChange(radioGroup.value);
        }
    }, [radioGroup.value]);

    React.useEffect(() => {
        if (activeChecked) {
            radioGroup.setValue(activeChecked);
        }
    }, [activeChecked]);

    //adds form data when comp mounts
    React.useEffect(() => {
        form.appendFormData({
            type: controlType,
            name: name,
            label: label,
            formGroup: formGroup.groupName,
            data: activeChecked,
            required: (required) ? true : false,
            validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: activeChecked?.text, highlighted: highlightDanger }),
            updated: false
        });
    }, []);

    //updates form data when value changes
    useNonInitialEffect(() => {
        //This keeps the editFormData from firing needlessly when component first mounts
        const shouldEditFormData = (activeChecked) ? (isMounted) ? true : false : true;
        if (shouldEditFormData) {
            form.editFormData({
                type: controlType,
                name: name,
                label: label,
                formGroup: formGroup.groupName,
                data: radioGroup.value,
                required: (required) ? true : false,
                validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: radioGroup?.value?.text, highlighted: highlightDanger }),
                updated: true
            });
        }
        setIsMounted(true);

    }, [radioGroup?.value?.text]);

    //remove form data when component unmounts
    useCleanupEffect(() => {
        form.removeFormData(name);
    });

    return (
        <>
            <div className={className}>

                {
                    (label) ? <Form.Label>{label}{(required) ? '*' : ''} {(toolTip) ? '<ToolTip className={`${styles.toolTip} ms-2`} overlay={toolTip} />' : null}</Form.Label> : null
                }
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

const RadioGroup = withTreble(GroupComp, { store: Store });
export default RadioGroup;
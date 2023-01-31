import React from 'react';
import { useNonInitialEffect, useCleanupEffect } from 'react-cork';
import FormControl from '../atoms/FormControl';
import IForm from '../../interfaces';
import useForm from '../../use-form';
import useFormGroup from '../organisms/Group/use-form-group';

interface Props {
    name: string;
    className?: string;
    onChange?: (value: { checked: boolean, text?: string | React.ReactNode, value: any }) => void;
    onFocus?: React.FocusEventHandler<any>;
    label?: string | React.ReactNode;
    checked?: boolean;
    disabled?: boolean;
    value: any;
    inline?: boolean;
    required?: boolean;
    toolTip?: JSX.Element | string;
    highlightMissing?: boolean;
    tabIndex?: number;
}
export default function CheckBox({ className, name, onChange, label, value, checked: _checked, disabled, inline, required, onFocus, toolTip, highlightMissing, tabIndex: _tabIndex }: Props) {

    const controlType = 'checkbox';
    const [checked, setChecked] = React.useState((_checked) ? true : false);
    const form = useForm();
    const formGroup = useFormGroup();
    const isReadOnly = (formGroup?.readOnly) ? true : (disabled) ? true : (form.readOnly) ? true : false;
    const highlightDanger = (!checked && highlightMissing) ? true : false;
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);
    const [isControlUpdated, setIsControlUpdate] = React.useState(false);
    const controlData: IForm.ControlData = {
        type: controlType,
        name: name,
        label: label,
        formGroup: formGroup.groupName,
        data: { checked: checked, text: (label) ? label : '', value: value },
        required: (required) ? true : false,
        validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: checked, highlighted: highlightDanger }),
        updated: isControlUpdated
    }

    useNonInitialEffect(() => {
        if (onChange) {
            onChange({ checked: checked, text: label, value: value });
        }
    }, [checked]);

    useNonInitialEffect(() => {
        setChecked((_checked) ? true : false)
    }, [_checked]);

    //resets input
    useNonInitialEffect(() => {
        setChecked((_checked) ? true : false);
    }, [form.resetTrigger]);

    //adds form data when comp mounts
    React.useEffect(() => {
        form.appendFormData(controlData);
    }, []);

    //updates form data when value changes
    useNonInitialEffect(() => {
        setIsControlUpdate(true);
        form.editFormData({ ...controlData, updated: true });
    }, [checked]);

    //makes sure control data label is updated when language changes
    useNonInitialEffect(() => {
        form.editFormData(controlData);
    }, [label]);

    //remove form data when component unmounts
    useCleanupEffect(() => {
        form.removeFormData(name);
    });

    return (
        <>
            <FormControl
                tabIndex={tabIndex}
                className={className}
                name={name}
                type={'checkbox'}
                label={label}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                onFocus={onFocus}
                disabled={isReadOnly}
                inline={inline}
                required={required}
                toolTip={toolTip}
                highlightDanger={highlightDanger}
            />
        </>
    )
}
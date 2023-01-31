import React from 'react';
import FormControl from '../atoms/FormControl';
import useForm from '../../use-form';
import useRadioGroup from '../organisms/RadioGroup/use-radio-group';
import { useNonInitialEffect } from 'react-cork';

interface Props {
    className?: string;
    onFocus?: React.FocusEventHandler<any>;
    label?: string | React.ReactNode;
    disabled?: boolean;
    value: any;
    inline?: boolean;
    toolTip?: JSX.Element | string;
}
export default function Radio({ className, label, value, disabled, inline, onFocus, toolTip }: Props) {

    const form = useForm();
    const radioGroup = useRadioGroup();
    const isReadOnly = (radioGroup.isDisabled) ? true : (disabled) ? true : (form.readOnly) ? true : false;
    const [isChecked, setIsChecked] = React.useState<boolean | undefined>((radioGroup.value?.value === value) ? true : false);

    useNonInitialEffect(() => {
        setIsChecked((radioGroup.value?.value === value) ? true : false);
    }, [radioGroup.value]);

    return (
        <>
            <FormControl
                tabIndex={radioGroup.tabIndex}
                isValid={radioGroup.isValid}
                isInvalid={radioGroup.isInValid}
                className={className}
                toolTip={toolTip}
                name={radioGroup.name}
                type={'radio'}
                label={label}
                value={value}
                onChange={() => {
                    radioGroup.setValue({ text: label, value: value });
                }}
                checked={isChecked}
                onFocus={onFocus}
                disabled={isReadOnly}
                inline={inline}
                required={radioGroup.required}
                highlightDanger={(!(radioGroup.value?.value) && radioGroup.highlightMissing) ? true : false}
            />
        </>
    )
}
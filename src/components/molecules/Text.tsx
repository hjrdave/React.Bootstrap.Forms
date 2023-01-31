import React, { forwardRef } from 'react';
import { useInput, useDebounce, useNonInitialEffect, useCleanupEffect, useString } from 'react-cork';
import IForm from '../../interfaces';
import FormControl from '../atoms/FormControl';
import useForm from '../../use-form';
import useFormGroup from '../organisms/Group/use-form-group';
interface Props {
    fowardRef?: React.Ref<HTMLInputElement | null>;
    debounce?: number;
    minCharDebounce?: number;
    onChange?: (value: string) => void;
    onFocus?: React.FocusEventHandler<any>;
    name: string;
    caption?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string | React.ReactNode;
    placeHolder?: string;
    required?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    loading?: boolean;
    toolTip?: JSX.Element | string;
    error?: string | object | null | boolean;
    value?: string;
    max?: number;
    icon?: JSX.Element;
    pattern?: RegExp;
    noSpecialChars?: boolean | string;
    hideLabel?: boolean;
    highlightMissing?: boolean;
    tabIndex?: number;
}
export default function Text({ className, name, placeHolder: _placeHolder, error, loading, onChange: _onChange, debounce, readOnly, label, required, value: _value, max, minCharDebounce: _minCharDebounce, icon, pattern, noSpecialChars, highlightMissing, tabIndex: _tabIndex, disabled, ...props }: Props) {

    const controlType = 'text';
    const string = useString();
    const { bind, value, reset, setValue } = useInput((_value) ? _value : '');
    const [controlValue, setControlValue] = React.useState((_value) ? _value : '');
    const [onChangeValue, setOnChangeValue] = React.useState('');
    const [isInvalid, setIsInvalid] = React.useState<boolean | undefined>();
    const [invalidFeedback, setInvalidFeedback] = React.useState<string | undefined>();
    const form = useForm();
    const formGroup = useFormGroup();
    const isReadOnly = (formGroup?.readOnly) ? true : (readOnly) ? true : (disabled) ? true : false;
    const placeHolder = (_placeHolder) ? _placeHolder : '';
    const minCharDebounce = (_minCharDebounce !== undefined) ? _minCharDebounce : 0;
    const highlightDanger = (controlValue.length === 0 && highlightMissing) ? true : false;
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);

    const onChange = useDebounce((value: string) => {
        const safeValue = value?.trim();
        setControlValue(safeValue);
        setOnChangeValue(safeValue);
    }, (debounce !== undefined) ? debounce : 300);

    //handles validation when typing value in input control
    const onInputFeedback = (value: string) => {
        if (noSpecialChars) {
            const ignoreList = (typeof noSpecialChars === 'string') ? noSpecialChars : undefined;
            if (string.hasSpecialChars(value, { ignore: ignoreList }) || value[0] == ' ') {
                const msg = (ignoreList) ? `Special Characters not allowed, except ${ignoreList}${(ignoreList.includes(' ')) ? '(" ")' : ''}.` : 'Special Characters not allowed.';
                setIsInvalid(true);
                setInvalidFeedback(msg);
            } else {
                setIsInvalid(undefined);
                setInvalidFeedback(undefined);
            }
        } else {
            setIsInvalid(undefined);
            setInvalidFeedback(undefined);
        }
    };
    const [isControlUpdated, setIsControlUpdate] = React.useState(false);
    const controlData: IForm.ControlData = {
        type: controlType,
        name: name,
        label: label,
        formGroup: formGroup.groupName,
        data: (controlValue.length > 0) ? { value: controlValue, text: label } : undefined,
        required: (required) ? true : false,
        validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: controlValue, max: max, highlighted: highlightDanger, noSpecialChars: noSpecialChars }),
        updated: isControlUpdated
    }

    //set query object without re setting activeItem
    useNonInitialEffect(() => {
        if (_onChange && (onChangeValue.length >= minCharDebounce)) {
            _onChange(onChangeValue);
        }
    }, [onChangeValue]);

    useNonInitialEffect(() => {
        onChange(value)
    }, [value]);

    //resets input
    useNonInitialEffect(() => {
        reset();
    }, [form.resetTrigger]);


    React.useEffect(() => {
        form.appendFormData(controlData);
    }, []);

    //updates form data when value changes
    useNonInitialEffect(() => {
        setIsControlUpdate(true);
        form.editFormData({ ...controlData, updated: true });
    }, [controlValue]);

    //makes sure control data label is updated when language changes
    useNonInitialEffect(() => {
        form.editFormData(controlData);
    }, [label]);

    //update value from outside of comp
    useNonInitialEffect(() => {
        const safeValue = (_value) ? _value : '';
        setValue(safeValue);
        setControlValue(safeValue);
    }, [_value]);

    //remove form data when component unmounts
    useCleanupEffect(() => {
        form.removeFormData(name);
    });

    //validates value as it is typed
    React.useEffect(() => {
        onInputFeedback(value);
    }, [value]);
    return (
        <>
            <FormControl
                {...props}
                {...bind}
                tabIndex={tabIndex}
                forwardRef={props.fowardRef}
                className={className}
                name={name}
                label={label}
                required={required}
                type={'text'}
                readOnly={isReadOnly}
                disabled={isReadOnly}
                placeHolder={placeHolder}
                maxlength={(max) ? max : 255}
                icon={icon}
                isInvalid={isInvalid}
                invalidFeedback={invalidFeedback}
                highlightDanger={highlightDanger}
            >
            </FormControl>
        </>
    )
}
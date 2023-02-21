import React from 'react';
import { Form } from 'react-bootstrap';
import ToolTip from '../../atoms/ToolTip';
import FormControl from '../../atoms/FormControl';
import InputPrependList from '../../atoms/InputPrependList';
import { useInput, useNonInitialEffect, useCleanupEffect, useNumber, useString } from 'react-cork';
import IForm from '../../../interfaces';
import useForm from '../../../use-form';
import useFormGroup from '../../organisms/Group/use-form-group';
import useFeedback from '../../../hooks/use-feedback';
import styles from './Amount.module.scss';

interface Props {
    name: string;
    label: string;
    hideLabel?: boolean;
    min?: number;
    max?: number;
    value?: number;
    required?: boolean;
    className?: string;
    readOnly?: boolean;
    tabIndex?: number;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<any>;
    currencyCodes?: { text: string, value: string }[];
    isValid?: boolean;
    isInvalid?: boolean;
    toolTip?: string | JSX.Element;
}
export default function NumberInput({ className, onChange, readOnly, name, label, required, value: _value, max, min, tabIndex: _tabIndex, currencyCodes, toolTip, hideLabel, ...props }: Props) {

    const number = useNumber();
    const string = useString();
    const ref = React.useRef(null);
    const controlType = 'amount';
    const feedback = useFeedback();
    const [float] = React.useState(2);
    const [step] = React.useState('any');
    const form = useForm();
    const formGroup = useFormGroup();
    const isReadOnly = (formGroup?.readOnly) ? true : (readOnly) ? true : (form.readOnly) ? true : false;
    const [defaultValue] = React.useState((typeof _value === 'number') ? (number.isInRange(_value, [min, max])) ? number.trimFloat(number.convertToNum(_value), float) : "0" : "0");
    const { value, bind, reset, setValue } = useInput(defaultValue);
    const [controlValue, setControlValue] = React.useState<string | number>(defaultValue);
    const [selectedCurrencyCode, setSelectedCurrencyCode] = React.useState<{ value?: string; text?: string }>({ value: 'USD', text: 'USD' });
    //const highlightDanger = (highlightMissing && Number(controlValue) === 0) ? true : false;
    const isInStep = (typeof step === 'string') ? true : ((typeof step === 'number') && ((value % step) === 0)) ? true : false;
    const isInRange = number.isInRange(value, [min, max]);
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);
    const CustomToolTip = () => (<ToolTip className={`${styles.toolTip} ms-2`} overlay={toolTip} />);

    type TFormatValue = (value: string) => string;
    const formatValue: TFormatValue = (value) => {
        const valueString = String(value);
        if (float > 0) {
            const formattedValue = string.trimFloat(string.removeLeadingZero(valueString), float);
            return formattedValue;
        }
        const [wholeNumSeg] = valueString.split(".");
        const formattedValue = string.removeLeadingZero(wholeNumSeg);
        return formattedValue;
    }

    const customInputValidation = (ref: any) => {
        const input = ref.current;
        if (input?.value == 0 && required) {
            input?.setCustomValidity('The number must be more then zero.');
        } else {
            // input is fine -- reset the error message
            input?.setCustomValidity('');
        }
    };
    const [isControlUpdated, setIsControlUpdate] = React.useState(false);
    const controlData: IForm.ControlData = {
        type: controlType,
        name: name,
        label: label,
        formGroup: formGroup.groupName,
        data: { value: Number(controlValue), text: label, currencyCode: selectedCurrencyCode.value },
        required: (required) ? true : false,
        validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: Number(controlValue), max: max, min: min, highlighted: false, step: step }),
        updated: isControlUpdated
    }

    React.useEffect(() => {
        customInputValidation(ref);
    }, []);

    useNonInitialEffect(() => {
        customInputValidation(ref);
        const safeValue = string.trimFloat(value.toString(), float);
        setControlValue(safeValue);
        if (onChange) {
            onChange(Number(safeValue));
        }
    }, [value]);

    //resets input
    useNonInitialEffect(() => {
        reset();
    }, [form.resetTrigger]);

    //adds form data on mount
    React.useEffect(() => {
        form.appendFormData(controlData);
    }, []);

    //updates form data when value changes
    useNonInitialEffect(() => {
        setIsControlUpdate(true);
        form.editFormData({ ...controlData, updated: true });
    }, [controlValue, selectedCurrencyCode.value]);

    //update value from outside of comp
    useNonInitialEffect(() => {

        if (_value !== undefined && _value != value) {
            const safeValue = number.trimFloat(number.convertToNum(_value), float);
            setControlValue(safeValue);
            setValue(safeValue);
        };
    }, [_value]);

    //makes sure control data label is updated when language changes
    useNonInitialEffect(() => {
        form.editFormData(controlData);
    }, [label]);

    //remove form data when component unmounts
    useCleanupEffect(() => {
        form.removeFormData(name);
    });

    React.useEffect(() => {
        feedback.checkRange(value, min, max);
    }, [value]);

    return (
        <>
            {
                (!hideLabel) ?
                    <Form.Label>{label} {(required) ? '*' : ''} {(toolTip) ? <CustomToolTip /> : null}</Form.Label> : null
            }
            <div className={`d-flex ${className || ''}`}>
                <InputPrependList
                    title={selectedCurrencyCode.text}
                    size={'sm'}
                    onChange={(selectedItem) => setSelectedCurrencyCode(selectedItem)}
                    items={currencyCodes}
                />
                <FormControl
                    {...props}
                    {...{ ...bind, value: (value === undefined || value.length === 0 || value === '0') ? "0" : formatValue(value) }}
                    tabIndex={tabIndex}
                    forwardRef={ref}
                    name={name}
                    required={required}
                    label={label}
                    hideLabel
                    readOnly={isReadOnly}
                    disabled={isReadOnly}
                    type={'number'}
                    maxlength={255}
                    max={max}
                    min={min}
                    step={step}
                    isInvalid={(isInStep && isInRange) ? undefined : true}
                    invalidFeedback={feedback.msg}
                    className={'w-100'}
                    controlClassName={styles.noLeftControlBorderRadius}
                />
            </div>
        </>
    )
};

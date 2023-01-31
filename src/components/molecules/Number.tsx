import React from 'react';
import FormControl from '../atoms/FormControl';
import { useInput, useNonInitialEffect, useCleanupEffect, useNumber, useString } from 'react-cork';
import IForm from '../../interfaces';
import useForm from '../../use-form';
import useFormGroup from '../organisms/Group/use-form-group';

interface Props {
    name: string;
    icon?: JSX.Element;
    caption?: string;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    label?: string | React.ReactNode;
    size?: 'sm' | 'lg';
    placeHolder?: string;
    required?: boolean;
    onChange?: (value: any) => void;
    onFocus?: React.FocusEventHandler<any>;
    isValid?: boolean;
    isInvalid?: boolean;
    min?: number;
    max?: number;
    step?: number;
    invalidFeedback?: string | JSX.Element;
    toolTip?: JSX.Element | string;
    value?: number;
    float?: number;
    hideLabel?: boolean;
    highlightMissing?: boolean;
    tabIndex?: number;
}
export default function NumberInput({ className, onChange, readOnly, name, label, required, value: _value, max, min, float: _float, step: _step, highlightMissing, tabIndex: _tabIndex, ...props }: Props) {

    const number = useNumber();
    const string = useString();
    const ref = React.useRef(null);
    const controlType = 'number';
    const [float] = React.useState((_float !== undefined) ? _float : 0);
    const [step] = React.useState((_step !== undefined) ? _step : 'any');
    const form = useForm();
    const formGroup = useFormGroup();
    const isReadOnly = (formGroup?.readOnly) ? true : (readOnly) ? true : (form.readOnly) ? true : false;
    const [defaultValue] = React.useState((typeof _value === 'number') ? (number.isInRange(_value, [min, max])) ? number.trimFloat(number.convertToNum(_value), float) : "0" : "0");
    const { value, bind, reset, setValue } = useInput(defaultValue);
    const [controlValue, setControlValue] = React.useState<string | number>(defaultValue);
    const highlightDanger = (highlightMissing && Number(controlValue) === 0) ? true : false;
    const isInStep = (typeof step === 'string') ? true : ((typeof step === 'number') && ((value % step) === 0)) ? true : false;
    const isInRange = number.isInRange(value, [min, max]);
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);

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
        data: { value: Number(controlValue), text: label },
        required: (required) ? true : false,
        validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: Number(controlValue), max: max, min: min, highlighted: highlightDanger, step: step }),
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
    }, [controlValue]);

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

    const onInvalidFeedback = () => {
        if ((min !== undefined) && (max !== undefined) && !(number.isInRange(value, [min, max]))) {
            return `$Value must be between ${min} and ${max}.`;
        }
        if (min !== undefined && (value < min)) {
            return `Value must be greater than ${min}.`;
        }
        if (max !== undefined && (value > max)) {
            return `Value must be less than ${max}.`;
        }
        if (typeof step === 'number' && ((value % step) !== 0)) {
            return `Value must be increments of ${step}.`;
        }
        return undefined;
    };

    return (
        <>
            <div className={className}>
                <FormControl
                    {...props}
                    {...{ ...bind, value: (value === undefined || value.length === 0 || value === '0') ? "0" : formatValue(value) }}
                    tabIndex={tabIndex}
                    forwardRef={ref}
                    name={name}
                    required={required}
                    label={label}
                    readOnly={isReadOnly}
                    disabled={isReadOnly}
                    type={'number'}
                    maxlength={255}
                    max={max}
                    min={min}
                    step={step}
                    isInvalid={(isInStep && isInRange) ? undefined : true}
                    invalidFeedback={onInvalidFeedback()}
                    highlightDanger={highlightDanger}
                />
            </div>
        </>
    )
};
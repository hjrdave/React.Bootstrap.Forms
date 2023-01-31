import React from 'react';
import { useRadioGroupProvider } from './Store';
const useFormGroup = () => {

    const [State, Store, Util] = useRadioGroupProvider();
    const isProvider = (State && Store && Util) ? true : false;

    const name = State?.name;
    const setName = (name: string) => {
        if (isProvider) {
            Store.update(Util.actions.setName, name);
        }
    };

    const isDisabled = (State?.isDisabled) ? true : false;
    const setIsDisabled = (isReadOnly: boolean) => {
        if (isProvider) {
            Store.update(Util.actions.setIsDisabled, isReadOnly);
        }
    };

    const value = State.value;
    const setValue = (value: { text?: string | React.ReactNode, value: any }) => {
        if (isProvider) {
            Store.update(Util.actions.updateValue, value);
        }
    };

    const required = State.required;
    const setRequired = (isRequired: boolean) => {
        if (isProvider) {
            Store.update(Util.actions.setRequired, isRequired);
        }
    };

    const isValid = State.isValid;
    const setIsValid = (isValid: boolean) => {
        if (isProvider) {
            Store.update(Util.actions.setIsValid, isValid);
        }
    };

    const isInValid = State.isInvalid;
    const setIsInvalid = (isInvalid: boolean) => {
        if (isProvider) {
            Store.update(Util.actions.setIsInvalid, isInvalid);
        }
    };

    const onChange = State.onChange;
    const setOnChange = (fn: (label: string, value: any) => void) => {
        if (isProvider) {
            Store.update(Util.actions.setOnChange, fn);
        }
    };

    const highlightMissing = State.highlightMissing;
    const setHighlightMissing = (isEnabled: boolean) => {
        Store.update(Util.actions.setHighlightMissing, isEnabled);
    }

    const tabIndex = State.tabIndex;
    const setTabIndex = (index: number) => {
        Store.update(Util.actions.setTabIndex, index);
    }

    return {
        name,
        setName,
        isDisabled,
        setIsDisabled,
        value,
        setValue,
        required,
        setRequired,
        isValid,
        setIsValid,
        isInValid,
        setIsInvalid,
        onChange,
        setOnChange,
        highlightMissing,
        setHighlightMissing,
        tabIndex,
        setTabIndex
    }
}

export default useFormGroup;
import React from 'react';
import { useFormProvider } from './Store';
import { useString, useDateTime } from 'react-cork'
import IForm from './interfaces';

const useForm = () => {

    const string = useString();
    const dateTime = useDateTime();
    const [State, Store, Util] = useFormProvider();
    const formProviderExists = (State && Store && Util) ? true : false;
    const [formData, setFormData] = React.useState<IForm.FormData>({ controlData: [], updatedControlData: [], missingData: { total: 0, required: 0, noInput: 0, highlighted: 0, formGroups: [] } });
    const resetTrigger = (State) ? State.resetTrigger : 0;
    const readOnly = (State) ? State.readOnly : false;
    const loading = (State) ? State.loading : false;
    const controlData = (State) ? State.controlData : [];
    const groupNames = (State) ? State.groupNames : [];
    const resetOnSubmit = (State) ? State.resetOnSubmit : false;
    const isSubmitBtnDisabled = (State) ? State.isSubmitBtnDisabled : false;

    const createFormData = (controlData: IForm.ControlData[]) => {
        let allMissing = 0;
        let missingAndRequired = 0;
        let noInput = 0;
        let highlighted = 0;
        let formGroupMissing: { name: string; total: number; required: number; noInput: number; highlighted: number; }[] = [];
        controlData?.forEach((control) => {
            if (!control?.validation?.hasInput) {
                allMissing = allMissing + 1;
            }
            if (control?.validation?.code === 'required') {
                missingAndRequired = missingAndRequired + 1;
            }
            if (!control?.validation?.hasInput && control?.validation?.code !== 'required') {
                noInput = noInput + 1;
            }
            if (control?.validation?.highlighted) {
                highlighted = highlighted + 1;
            }
        });
        groupNames?.forEach((name) => {
            let allMissing = 0;
            let missingAndRequired = 0;
            let noInput = 0;
            let highlighted = 0;
            const groupFormData = controlData?.filter((control) => control?.formGroup === name);
            groupFormData?.forEach((control) => {
                if (!control?.validation?.hasInput) {
                    allMissing = allMissing + 1;
                }
                if (control?.validation?.code === 'required') {
                    missingAndRequired = missingAndRequired + 1;
                }
                if (!control?.validation?.hasInput && control?.validation?.code !== 'required') {
                    noInput = noInput + 1;
                }
                if (control?.validation?.highlighted) {
                    highlighted = highlighted + 1;
                }
            });
            formGroupMissing = [
                ...formGroupMissing,
                {
                    name: name,
                    total: allMissing,
                    required: missingAndRequired,
                    noInput: noInput,
                    highlighted: highlighted
                }
            ];
        });

        const data = {
            controlData: controlData,
            updatedControlData: controlData?.filter((item) => (item.updated)),
            missingData: {
                total: allMissing,
                required: missingAndRequired,
                noInput: noInput,
                highlighted: highlighted,
                formGroups: formGroupMissing
            }
        }
        setFormData(data);
    }
    const reset = (options?: { disableMsg?: boolean }) => {
        if (formProviderExists) {
            Store.update(Util.actions.toggleReset, (State?.resetTrigger) ? 0 : 1);
        }
    }
    const setReadOnly = (isReadOnly: boolean) => {
        if (formProviderExists) {
            Store.update(Util.actions.updateReadOnly, isReadOnly);
        }
    }

    const setLoading = (isLoading: boolean) => {
        if (formProviderExists) {
            Store.update(Util.actions.updateLoading, isLoading);
        }
    }
    const updateControlData = (items: IForm.ControlData[]) => {
        if (formProviderExists) {
            Store.update(Util.actions.updateControlData, items);
        }
    }
    const appendFormData = (item: IForm.ControlData) => {
        if (formProviderExists) {
            Store.append(Util.actions.updateControlData, item);
        }
    }
    const editFormData = (item: IForm.ControlData) => {
        if (formProviderExists) {
            const predicate = (storeItem: IForm.ControlData) => ((storeItem.name === item.name) ? item : null);
            Store.edit(Util.actions.updateControlData, predicate);
        }
    }
    const removeFormData = (name: string) => {
        if (formProviderExists) {
            Store.remove(Util.actions.updateControlData, (item: { name: string }) => item.name === name);
        }
    };

    //sets the updated property in control data to false. Used after a submit.
    const clearUpdatedFormData = () => {
        const resetUpdatedFormData = controlData.map((control) => ({ ...control, updated: false }));
        Store.update(Util.actions.updateControlData, resetUpdatedFormData);
    }

    const appendGroupName = (name: string) => {
        //list manager does not support primitive types, need to update this in TLM
        if (formProviderExists) {
            Store.append(Util.actions.updateGroupNames, name as any);
        }
    }

    const removeGroupName = (name: string) => {
        //list manager does not support primitive types, need to update this in TLM
        if (formProviderExists) {
            Store.remove(Util.actions.updateGroupNames, name as any);
        }
    }

    const setResetOnSubmit = (shouldReset: boolean) => {
        if (formProviderExists) {
            Store.update(Util.actions.setResetOnSubmit, shouldReset);
        }
    };

    //this create validation data info for the formData object.
    const generateValidationInfo = (meta: {
        type: IForm.ControlType;
        isRequired?: boolean;
        controlValue?: any;
        min?: number;
        max?: number;
        noSpecialChars?: boolean | string;
        highlighted: boolean;
        step?: number | string;
    }) => {

        const type = meta.type;
        const required = (meta.isRequired) ? true : false;
        const messages: { [key: string]: { desc: string, code: IForm.ValidationCode } } = {
            required: {
                desc: 'Input is required.',
                code: 'required'
            },
            requiredChecked: {
                desc: 'Should be checked.',
                code: 'required'
            },
            minMax: {
                desc: `Input must not be less than ${meta?.min} and greater than ${meta?.max}.`,
                code: 'minMax'
            },
            min: {
                desc: `Input must not be less than ${meta?.min}.`,
                code: 'min'
            },
            max: {
                desc: `Input must not be greater than ${meta?.max}.`,
                code: 'max'
            },
            increment: {
                desc: `Input must be incremented by ${meta?.step}.`,
                code: 'increment'
            },
            invalidDateRange: {
                desc: `Date Range is invalid.`,
                code: 'invalidDateRange'
            },
            noSpecialChars: {
                desc: `Special Characters not allowed.`,
                code: 'noSpecialChars'
            },
            noSpecialCharsExcept: {
                desc: `Special Characters not allowed, except, ${meta?.noSpecialChars}${(typeof meta.noSpecialChars === 'string') ? (meta?.noSpecialChars?.includes(" ")) ? '(" ")' : '' : ''}`,
                code: 'noSpecialCharsExcept'
            },
            isValid: {
                desc: `Input is valid.`,
                code: 'isValid'
            }
        }

        const checkValidation = () => {
            if (type === 'text' || type === 'textarea' || type === 'email' || type === 'phone' || type === 'radio') {
                const value = (meta.controlValue) ? meta.controlValue : '';
                const min = meta.min;
                const max = meta.max;
                const hasInput = ((value === undefined) || (value.length === 0)) ? false : true;
                const isMissingInput = (required && !hasInput) ? true : false;
                const ignoreList = (typeof meta.noSpecialChars === 'string') ? meta.noSpecialChars : undefined;
                const hasMinMax = (typeof min === 'number' && typeof max === 'number') ? true : false;
                const lessThanMin = (typeof min === 'number') ? (value.length < min) ? true : false : false;
                const greaterThanMax = (typeof max === 'number') ? (value.length > max) ? true : false : false;
                const hasSpecialChars = (meta.noSpecialChars) ? string.hasSpecialChars(value, { ignore: ignoreList }) : false;

                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.required.desc,
                        code: messages.required.code
                    }
                }
                if (hasMinMax && (lessThanMin || greaterThanMax)) {

                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.minMax.desc,
                        code: messages.minMax.code
                    }
                }
                if (lessThanMin) {

                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.min.desc,
                        code: messages.min.code
                    }
                }
                if (greaterThanMax) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.max.desc,
                        code: messages.max.code
                    }
                }
                if (hasSpecialChars) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: (ignoreList) ? messages.noSpecialCharsExcept.desc : messages.noSpecialChars.desc,
                        code: (ignoreList) ? messages.noSpecialCharsExcept.code : messages.noSpecialChars.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: hasInput,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            };
            if (type === 'number') {
                const value: number = (typeof meta.controlValue === 'string') ? Number(meta.controlValue) : meta.controlValue;

                const min = meta?.min;
                const max = meta?.max;
                const hasInput = (meta?.highlighted && value === 0 && ((min !== undefined) ? (min > 0) ? false : true : true)) ? false : true;//checking min because if 0 is below min then it should be invalid
                const isMissingInput = (required && value === 0) ? true : false;
                const hasMinMax = (typeof min === 'number' && typeof max === 'number') ? true : false;
                const lessThanMin = (typeof min === 'number') ? (value < min) ? true : false : false;
                const greaterThanMax = (typeof max === 'number') ? (value > max) ? true : false : false;
                const notInStep = (typeof meta.step === 'number' && ((value % meta?.step) !== 0)) ? true : false;

                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.required.desc,
                        code: messages.required.code
                    }
                }
                if (hasMinMax && (lessThanMin || greaterThanMax)) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.minMax.desc,
                        code: messages.minMax.code
                    }
                }
                if (lessThanMin) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.min.desc,
                        code: messages.min.code
                    }
                }
                if (greaterThanMax) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.max.desc,
                        code: messages.max.code
                    }
                }
                if (notInStep) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.increment.desc,
                        code: messages.increment.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: hasInput,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            }
            if (type === 'select' || type === 'suggest' || type === 'countryCode' || type === 'year' || type === 'time') {

                const value: /*IForm.InputItem*/any | undefined = meta.controlValue;
                const checkValue = (value?: string | /*IForm.InputItem*/any) => {
                    if (value) {
                        if (typeof value === 'object') {
                            return (value?.value !== undefined) ? value?.value?.toString().length > 0 : false;
                        }
                        if (typeof value === 'string') {
                            return (value?.length > 0);
                        }
                        if (typeof value === 'number') {
                            return (value !== undefined);
                        }
                        return false;
                    }
                    return false;
                }
                const hasInput = checkValue(value);
                const isMissingInput = (required && !hasInput) ? true : false;
                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.required.desc,
                        code: messages.required.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: hasInput,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            }
            if (type === 'checkbox' || type === 'switch' || type === 'hazmat' || type === 'inbond') {
                const isChecked: boolean = meta.controlValue;
                const isMissingInput = (required && !isChecked) ? true : false;
                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: isChecked,
                        highlighted: meta?.highlighted,
                        msg: messages.requiredChecked.desc,
                        code: messages.requiredChecked.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: isChecked,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            }
            if (type === 'date') {
                const value: string | undefined = meta.controlValue;
                const hasInput = (value) ? (value.toString().length > 0) ? true : false : false;
                const isMissingInput = (required && !hasInput) ? true : false;
                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.required.desc,
                        code: messages.required.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: hasInput,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            }
            if (type === 'dateRange') {
                const value: { from?: string; to?: string } = meta.controlValue;
                const hasInput = (!value?.from || !value?.to) ? false : true;
                const isMissingInput = (required && !hasInput) ? true : false;
                const inValidRange = ((value?.from && value?.to) || (value?.from === undefined && value?.to === undefined)) ? false : true;
                if (isMissingInput) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.required.desc,
                        code: messages.required.code
                    }
                }
                if (inValidRange) {
                    return {
                        isValid: false,
                        hasInput: hasInput,
                        highlighted: meta?.highlighted,
                        msg: messages.invalidDateRange.desc,
                        code: messages.invalidDateRange.code
                    }
                }
                return {
                    isValid: true,
                    hasInput: hasInput,
                    highlighted: meta?.highlighted,
                    msg: messages.isValid.desc,
                    code: messages.isValid.code
                }
            }
            return {
                isValid: true,
                hasInput: ((meta?.controlValue !== undefined) || (meta?.controlValue?.length > 0) || (meta?.controlValue?.value?.toString() > 0)) ? false : true,
                highlighted: meta?.highlighted,
                msg: messages.isValid.desc,
                code: messages.isValid.code
            }
        };

        return checkValidation();

    }

    //sets disable state on submit button (goal is to try and prevent button action until previous button action has finished)
    const setIsSubmitBtnDisabled = (isDisabled: boolean) => {
        Store.update(Util.actions.setIsSubmitBtnDisabled, isDisabled);
    }



    return {
        reset,
        resetTrigger,
        setReadOnly,
        readOnly,
        loading,
        controlData,
        setLoading,
        appendFormData,
        updateControlData,
        editFormData,
        removeFormData,
        appendGroupName,
        groupNames,
        formData,
        removeGroupName,
        createFormData,
        setResetOnSubmit,
        resetOnSubmit,
        generateValidationInfo,
        clearUpdatedFormData,
        isSubmitBtnDisabled,
        setIsSubmitBtnDisabled
    }
}

export const usePublicForm = () => {
    const {
        reset,
        readOnly,
        loading,
        groupNames,
        controlData
    } = useForm();

    return {
        reset,
        readOnly,
        loading,
        groupNames,
        controlData
    }
}

export default useForm;
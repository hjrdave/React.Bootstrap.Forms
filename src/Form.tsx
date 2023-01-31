import React from 'react';
import BSForm from 'react-bootstrap/Form';
import { withTreble } from 'treble-gsm';
import Store from './Store';
import useNonInitialEffect from 'react-cork/use-non-initial-effect';
import IForm from './interfaces'
import useForm from './use-form';

export interface Props {
    children?: JSX.Element | JSX.Element[];
    onSubmit?: (event: React.FormEventHandler<HTMLFormElement>, formData: IForm.FormData) => void;
    onChange?: (formData: IForm.FormData) => void;
    resetOnSubmit?: boolean;
    resetOnSuccess?: boolean;
    success?: boolean | null;
    error?: string | object | null;
    loading?: boolean;
    loadingMsg?: string;
    errorMsg?: string | object | null;
    successMsg?: string;
    validationMsg?: string;
    disableValidation?: boolean;
    disableValidationMsg?: boolean;
    validated?: boolean;
    readOnly?: boolean;
    style?: React.CSSProperties;
}
function FormComp({ children, error, loading, onSubmit: _onSubmit, loadingMsg, errorMsg, successMsg, validationMsg, disableValidation, validated: _validated, readOnly, style, disableValidationMsg, onChange, resetOnSubmit, success, resetOnSuccess }: Props) {
    //const message = useInAppMessage();
    const form = useForm();
    //const i18n = useI18N();
    const [validated, setValidated] = React.useState((_validated) ? true : false);
    const [missingFieldCount, setMissingFieldCount] = React.useState(0);
    const [isValidationEnabled] = React.useState((disableValidation) ? false : true);
    const [isValidationMsgEnabled] = React.useState((disableValidationMsg) ? false : true);
    const [isSubmitSuccess] = React.useState<undefined | null | boolean>(success);

    const onSubmit = (event: any, formData: IForm.FormData) => {
        //disables submit button so user is unable to fire repeatedly
        setTimeout(() => {
            form.setIsSubmitBtnDisabled(true);
        }, 0)


        const preventFormDefaults = () => { event.preventDefault(); event.stopPropagation(); };

        //validation enabled
        if (isValidationEnabled) {
            setValidated(true);
            const formInstance = event.currentTarget;
            const isFormValidated = (formInstance.checkValidity()) ? (formData.controlData.find((item) => item.validation?.isValid === false) === undefined) ? true : false : false;

            //form controls are valid
            if (isFormValidated) {
                if (isValidationEnabled) {
                    setTimeout(() => {
                        form.setIsSubmitBtnDisabled(false);
                    }, 0);
                };
                if (_onSubmit) {
                    _onSubmit(event, formData);
                }
                if (resetOnSubmit) {
                    form.reset({ disableMsg: true });
                    setValidated(false);
                }
                preventFormDefaults();
            }
            //forms controls are not valid
            else {

                if (isValidationEnabled) {

                    //message.dismissAll();
                    const requiredCount = form.formData.missingData.required;
                    const invalidCount = form.formData.controlData.filter((control) => (!control.validation?.isValid && control.validation?.hasInput)).length;

                    //checks to see if any required controls are empty
                    if (requiredCount > 0 && isValidationMsgEnabled) {


                        //lists out field labels that are required and missing data
                        const fieldLabels: string = form.formData.controlData.filter((control) => {
                            if (control.required && !(control.validation?.isValid) && !(control.validation?.hasInput)) {
                                return control;
                            }
                        }).map((control) => ((control?.label) ? ` ${control?.label.toString()}` : '')).toString();
                        setTimeout(() => {
                            form.setIsSubmitBtnDisabled(false);
                        }, 0);
                    }
                    //alert(invalidCount)
                    //checks to see if any controls have invalid inputs
                    if (invalidCount > 0 && isValidationMsgEnabled) {

                        //lists out field labels that are required and missing data
                        const fieldLabels: string = form.formData.controlData.filter((control) => {
                            if (!control.validation?.isValid && control.validation?.hasInput && isValidationMsgEnabled) {
                                return control;
                            }
                        }).map((control) => ((control?.label) ? ` ${control?.label.toString()}` : '')).toString();
                        setTimeout(() => {
                            form.setIsSubmitBtnDisabled(false);
                        }, 0);

                    }
                    preventFormDefaults();
                }
            }
        }
        //validation disabled
        else {
            if (isValidationEnabled) {
                form.setIsSubmitBtnDisabled(false);
            };
            if (_onSubmit) {
                _onSubmit(event, formData);
            }
            if (resetOnSubmit) {
                form.reset({ disableMsg: true });
            }
            preventFormDefaults();
        }
        //disables 
        //return (form.setIsSubmitBtnDisabled(false))
    };

    //handle submission success and errors
    useNonInitialEffect(() => {
        if (isSubmitSuccess) {
            if (isValidationMsgEnabled) {
                form.setIsSubmitBtnDisabled(false);
            }
            if (resetOnSuccess) {
                form.reset({ disableMsg: true });
            }
            setValidated(false);
        }
    }, [isSubmitSuccess]);

    //check for submission errors
    useNonInitialEffect(() => {
        if (error !== null) {
            form.setIsSubmitBtnDisabled(false);
        }
    }, [error]);

    //create form data
    useNonInitialEffect(() => {
        form.createFormData(form.controlData);
    }, [form.controlData]);

    //sets form loading state
    React.useEffect(() => {
        if (loading !== undefined) {
            form.setLoading(loading);
        }
    }, [loading]);

    //sets form readonly state
    React.useEffect(() => {
        form.setReadOnly((readOnly) ? true : false);
    }, [readOnly]);

    //creates formData object and passes to onChange
    React.useEffect(() => {
        setMissingFieldCount(form.formData.missingData.required);
        if (onChange) {
            onChange(form.formData);
        }
    }, [form.formData]);


    return (
        <>
            <BSForm autoComplete={'off'} noValidate validated={validated} onSubmit={(e) => onSubmit(e, form.formData)} style={style}>
                <input autoComplete="false" name="hidden" type="text" className="d-none" />
                {children}
            </BSForm>
        </>
    )
}

const Form = withTreble(FormComp, { store: Store });
export default Form;
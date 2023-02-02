import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './FormControl.module.scss';
//import ToolTip from '../tool-tip';

export interface Props {
    name: string;
    icon?: JSX.Element;
    postFixIcon?: JSX.Element;
    caption?: string;
    className?: string;
    controlClassName?: string;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string | React.ReactNode;
    as?: 'input' | 'textarea' | 'select' | React.ElementType;
    placeHolder?: string;
    required?: boolean;
    inline?: boolean;
    value?: any;
    defaultValue?: string | number | string[];
    onClick?: (e: React.MouseEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onChange?: (value: any, e?: React.SyntheticEvent) => void;
    onFocus?: React.FocusEventHandler<any>;
    onFocusCapture?: React.FocusEventHandler<any>;
    type?: "number" | "text" | "email" | "url" | "checkbox" | "radio" | "password" | "tel" | "switch";
    forwardRef?: React.Ref<HTMLSelectElement | HTMLDivElement | HTMLInputElement | null>;
    checked?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    error?: object | null;
    loading?: boolean;
    toolTip?: JSX.Element | string;
    min?: number;
    max?: number;
    step?: number | string;
    rows?: number;
    pattern?: RegExp;
    maxlength?: number;
    children?: JSX.Element | JSX.Element[];
    invalidFeedback?: string | JSX.Element;
    caretDown?: boolean;
    controlType?: string;
    defaultChecked?: boolean;
    autoComplete?: 'off' | 'on' | 'new-password';
    onInput?: (input: any) => void;
    autoFocus?: boolean;
    enableDropdownToggle?: boolean;
    tabIndex?: number;
    hideLabel?: boolean;
    highlightDanger?: boolean;
}
export default function FormControl({ hideLabel, name, caption, className, disabled, readOnly, placeHolder, required, onClick, onKeyDown, type, label: _label, icon, forwardRef, defaultValue, as, isValid, isInvalid, min, max, step, rows, pattern, maxlength, onChange, onFocus, onFocusCapture, value, checked, children, inline, invalidFeedback, toolTip, caretDown, defaultChecked, autoComplete, onInput, autoFocus, controlClassName, enableDropdownToggle, tabIndex, highlightDanger }: Props) {
    const controlID = name;

    const label = (required) ? `${_label}*` : _label;
    // const CustomToolTip = () => (<ToolTip className={`${styles.toolTip} ms-2`} overlay={toolTip} />);
    const onClickFN = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
    }
    const onChangeFN = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (onChange) {
            const value = (e.target as any)?.value;
            onChange(e, value);
        }
    }

    return (
        <>
            {
                (type === 'checkbox' || type === 'radio' || type === 'switch') ?

                    <Form.Check
                        type={type}
                        label={(React.isValidElement(_label)) ? _label : <>{_label}{(toolTip) ? 'tooltip' : null}</>}
                        onChange={onChange}
                        onFocus={onFocus}
                        checked={checked}
                        disabled={disabled}
                        onKeyDown={(e) => { if (e.keyCode == 13 || e.key === 'Enter') { e.preventDefault(); return false }; if (onKeyDown) { onKeyDown(e) } }}
                        name={controlID}
                        inline={inline}
                        className={`${(highlightDanger) ? styles.highlightDangerCheckBox : ''} ${className}`}
                        required={required}
                        isInvalid={isInvalid}
                        isValid={isValid}
                        defaultChecked={defaultChecked}
                        tabIndex={tabIndex}
                    /> :
                    <Form.Group controlId={controlID} className={className}>
                        {
                            (label && !hideLabel) ? <Form.Label>{label} {(toolTip) ? '' : null}</Form.Label> : null
                        }
                        <InputGroup hasValidation className={styles.inputGroup}>
                            <>
                                {
                                    (icon) ? <InputGroup.Text id={`${controlID}_icon`} className={styles.inputGroupText}>{icon}</InputGroup.Text> : null
                                }

                                <div style={{ display: 'flex', flexWrap: 'wrap', width: icon ? "calc(100% - 35px)" : "100%" }} className={(icon) ? styles.hasIcon : ''}>

                                    {
                                        (enableDropdownToggle) ?
                                            <Dropdown.Toggle as={'div'} style={{ width: "100%" }}>
                                                <Form.Control
                                                    ref={forwardRef}
                                                    as={as}
                                                    defaultValue={defaultValue}
                                                    value={value}
                                                    placeholder={placeHolder}
                                                    onClick={onClickFN}
                                                    onKeyDown={(e) => { if (e.keyCode == 13 || e.key === 'Enter') { e.preventDefault(); return false }; if (onKeyDown) { onKeyDown(e) } }}
                                                    onChange={onChangeFN}
                                                    onFocus={onFocus}
                                                    onFocusCapture={onFocusCapture}
                                                    type={(type) ? type : 'text'}
                                                    required={required}
                                                    disabled={disabled}
                                                    readOnly={readOnly}
                                                    size={'sm'}
                                                    isValid={isValid}
                                                    isInvalid={isInvalid}
                                                    min={min}
                                                    max={max}
                                                    step={step}
                                                    rows={rows}
                                                    pattern={pattern}
                                                    maxLength={(maxlength) ? maxlength : 255}
                                                    className={`${(caretDown ? `${styles.textboxBorderCaretDown}` : `${styles.textboxNoBorderCaretDown}`)} ${(highlightDanger) ? styles.highlightDanger : ''} ${controlClassName}`}
                                                    autoComplete={autoComplete}
                                                    onInput={onInput}
                                                    autoFocus={autoFocus}
                                                    tabIndex={tabIndex}
                                                >
                                                    {children}
                                                </Form.Control>
                                            </Dropdown.Toggle> :
                                            <Form.Control
                                                ref={forwardRef}
                                                as={as}
                                                defaultValue={defaultValue}
                                                value={value}
                                                placeholder={placeHolder}
                                                onClick={onClickFN}
                                                onKeyDown={(e) => { if (e.keyCode == 13 || e.key === 'Enter') { e.preventDefault(); return false }; if (onKeyDown) { onKeyDown(e) } }}
                                                onChange={onChangeFN}
                                                onFocus={onFocus}
                                                onFocusCapture={onFocusCapture}
                                                type={(type) ? type : 'text'}
                                                required={required}
                                                disabled={disabled}
                                                readOnly={readOnly}
                                                size={'sm'}
                                                isValid={isValid}
                                                isInvalid={isInvalid}
                                                min={min}
                                                max={max}
                                                step={step}
                                                rows={rows}
                                                pattern={pattern}
                                                maxLength={(maxlength) ? maxlength : 255}
                                                className={`${(caretDown ? `${styles.textboxBorderCaretDown}` : `${styles.textboxNoBorderCaretDown}`)} ${(highlightDanger) ? styles.highlightDanger : ''} ${controlClassName}`}
                                                autoComplete={autoComplete}
                                                onInput={onInput}
                                                autoFocus={autoFocus}
                                                tabIndex={tabIndex}
                                            >
                                                {children}
                                            </Form.Control>
                                    }

                                    {(caretDown) &&
                                        <div className={styles.divCaretDown} style={{ pointerEvents: 'none' }}>
                                            <i className={`fa-solid fa-caret-down ${styles.iCaretDown}`}></i>
                                        </div>
                                    }
                                    {
                                        (invalidFeedback) ?

                                            <Form.Control.Feedback type="invalid" tooltip className={'styles.invalidToolTip'}>
                                                {invalidFeedback}
                                            </Form.Control.Feedback> : null
                                    }
                                </div>

                            </>
                        </InputGroup>
                        {
                            (caption) ?
                                <Form.Text>
                                    {caption}
                                </Form.Text> : null
                        }
                    </Form.Group>
            }
        </>
    )
}
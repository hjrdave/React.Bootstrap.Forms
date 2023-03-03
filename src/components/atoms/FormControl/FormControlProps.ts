import IForm from "../../../IForm";
export default interface FormControlProps extends IForm.BaseControlProps {
    placeholder?: string;
    type?: string;
    as?: 'input' | 'textarea' | React.ElementType;
    size?: 'sm' | 'lg';
    htmlSize?: number;
    plaintext?: boolean;
    readOnly?: boolean;
    htmlFor?: string;
    ariaDescribedby?: string;
    ariaLabel?: string;
    caption?: string;
    captionId?: string;
    hasValidation?: boolean;
    debounceTime?: number;
    appendControl?: JSX.Element;
    prependControl?: JSX.Element;
    maxLength?: number;
    min?: number;
    max?: number;
    rows?: number;
    pattern?: RegExp;
}
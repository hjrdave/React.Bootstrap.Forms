import IForm from "../../../IForm";
export default interface FormControlProps extends IForm.BaseControlProps {
    placeholder?: string;
    type?: string;
    as?: 'input' | 'textarea' | React.ElementType;
    size?: 'sm' | 'lg';
    htmlSize?: number;
    plaintext?: boolean;
    readOnly?: boolean;
    controlId: string;
    htmlFor?: string;
    ariaDescribedby?: string;
    ariaLabel?: string;
    caption?: string;
    captionId?: string;
    hasValidation?: boolean;
    appendControl?: (props: { [key: string]: any }) => JSX.Element;
    prependControl?: (props: { [key: string]: any }) => JSX.Element;
}
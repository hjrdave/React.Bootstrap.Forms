import { ButtonVariant } from "react-bootstrap/esm/types";
declare namespace IForm {
    export interface BaseControlProps {
        ref?: any;
        name: string;
        disabled?: boolean;
        id?: string;
        isInvalid?: boolean;
        isValid?: boolean;
        label?: string | JSX.Element;
        readOnly?: boolean;
        tabIndex?: number;
        value?: string | any[] | number;
        className?: string;
        bsPrefix?: string;
        required?: boolean;
        onChange?: (e: any) => void;
        onInput?: (input: any) => void;
        onKeyDown?: (e: React.KeyboardEvent) => void;
        onFocus?: React.FocusEventHandler<any>;
        onFocusCapture?: React.FocusEventHandler<any>;
        autoFocus?: boolean;
    }
    export interface BaseButtonProps {
        className?: string;
        active?: boolean;
        disabled?: boolean;
        size?: 'sm' | 'lg';
        variant?: ButtonVariant;
        bsPrefix?: string;
        children?: JSX.Element | JSX.Element[];
        onClick?: (e: any) => void;
    }
}
export default IForm;
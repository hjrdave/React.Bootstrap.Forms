declare namespace IForm {
    export interface BaseControlProps {
        ref?: any;
        name: string;
        disabled?: boolean;
        id?: string;
        isInvalid?: boolean;
        isValid?: boolean;
        label?: string | JSX.Element;
        onChange?: (e: any) => void;
        readOnly?: boolean;
        tabIndex?: number;
        value?: string | any[] | number;
        className?: string;
        bsPrefix?: string;
        required?: boolean;
        defaultValue?: string | number | any[];
    }
}
export default IForm;
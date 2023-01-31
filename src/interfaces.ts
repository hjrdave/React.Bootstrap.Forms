//import { IInputItem } from "./components/atoms/InputItem";
declare namespace IForm {

    export type ControlType = 'control' | 'date' | 'dateRange' | 'time' | 'year' | 'checkbox' | 'countryCode' | 'email' | 'hazmat' | 'inbond' | 'number' | 'phone' | 'radio' | 'search' | 'select' | 'suggest' | 'switch' | 'textarea' | 'text';

    //export type InputItem = IInputItem.Item | { [key: string]: any }
    export type ValidationCode = 'required' | 'minMax' | 'min' | 'max' | 'invalidDateRange' | 'noSpecialChars' | 'noSpecialCharsExcept' | 'increment' | 'isValid';

    export interface ControlData {
        type: ControlType;
        name: string;
        label?: string | React.ReactNode;
        required: boolean;
        formGroup?: string;
        data?: any//InputItem;
        validation?: {
            isValid: boolean;
            hasInput: boolean;
            highlighted: boolean;
            msg: string;
            code: ValidationCode;
        }
        updated: boolean
    }

    export interface Meta {
        missingCount: number;
    }

    export interface FormData {
        controlData: ControlData[];
        updatedControlData: ControlData[];
        missingData: {
            total: number;
            required: number;
            noInput: number;
            highlighted: number;
            formGroups: {
                name: string,
                total: number;
                required: number;
                noInput: number;
                highlighted: number;
            }[]
        };
    }

}

export default IForm;
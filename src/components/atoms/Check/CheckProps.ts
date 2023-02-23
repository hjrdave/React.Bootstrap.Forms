import IForm from "../../../IForm";

export default interface CheckProps extends IForm.BaseControlProps {
    feedback?: React.ReactNode;
    feedbackToolTip?: boolean;
    inline?: boolean;
    reverse?: boolean;
    title?: string;
    type?: 'radio' | 'checkbox' | 'switch';
    bsSwitchPrefix?: string;
    size?: number;
}
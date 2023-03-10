import React from 'react';
import { IFormData } from './interfaces';
import { default as FormComp, Props } from './Form';
import Control from './components/molecules/Control';
import CheckBox from './components/molecules/Checkbox';
import Radio from './components/molecules/Radio';
import NumberInput from './components/molecules/Number';
import Amount from './components/molecules/Amount';
import Upload from './components/molecules/Upload';
import ToolTip from './components/atoms/ToolTip';
// import TextArea from './components/molecules/TextArea';
// import Phone from './components/molecules/Phone';
// import Email from './components/molecules/Email';
import Select from './components/molecules/Select';
// import Suggest from './components/molecules/Suggest';
import Submit from './components/molecules/Submit';
// import Reset from './components/molecules/Reset';
// import Switch from './components/molecules/Switch';
import Text from './components/molecules/Text';
import Group from './components/organisms/Group';
import RadioGroup from './components/organisms/RadioGroup';
import FormList from './components/organisms/FormList';
// import Year from './components/molecules/Year';
import useUpload from './hooks/use-upload';
import useForm, { usePublicForm } from './use-form';

export interface IForm {
    (props: Props): JSX.Element;
    Control: typeof Control;
    CheckBox: typeof CheckBox;
    Radio: typeof Radio;
    Number: typeof NumberInput;
    Amount: typeof Amount;
    Upload: typeof Upload;
    // TextArea: typeof TextArea;
    // Phone: typeof Phone;
    // Email: typeof Email;
    Select: typeof Select;
    // Year: typeof Year;
    // Suggest: typeof Suggest;
    Submit: typeof Submit;
    // Reset: typeof Reset;
    // Switch: typeof Switch;
    Group: typeof Group;
    RadioGroup: typeof RadioGroup;
    FormList: typeof FormList;
    Text: typeof Text;
    ToolTip: typeof ToolTip;
    useForm: typeof usePublicForm;
    useUpload: typeof useUpload;
}

const Form: IForm = (props) => (<FormComp {...props} />);
Form.Control = Control;
Form.CheckBox = CheckBox;
Form.Radio = Radio;
Form.Number = NumberInput;
Form.Amount = Amount;
Form.Upload = Upload;
Form.ToolTip = ToolTip;
// Form.TextArea = TextArea;
// Form.Phone = Phone;
// Form.Email = Email;
Form.Select = Select;
// Form.Year = Year;
// Form.Suggest = Suggest;
Form.Submit = Submit;
// Form.Reset = Reset;
// Form.Switch = Switch;
Form.Text = Text;
Form.Group = Group;
Form.RadioGroup = RadioGroup;
Form.FormList = FormList;
Form.useForm = usePublicForm;
Form.useUpload = useUpload;


export type { IFormData }
export default Form;
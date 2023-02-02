import React from 'react';
import InputDropdown from '../../atoms/InputDropdown';
import InputItem, { IInputItem } from '../../atoms/InputItem';
import FormControl from '../../atoms/FormControl';
import InputToolTip from '../../atoms/InputToolTip';
import ListItemDivider from '../../atoms/ListItemDivider';
import CustomInputItem from '../../atoms/CustomInputItem';
import { Dropdown } from 'react-bootstrap';
import useForm from '../../../use-form';
import IForm from '../../../interfaces';
import useFormGroup from '../../organisms/Group/use-form-group';
import { useNonInitialEffect, useCleanupEffect, useObject } from 'react-cork';
import styles from './Select.module.scss';


interface Props {
    mapToValue?: string | number;
    mapToText?: string;
    data: { [key: string]: any }[] | IInputItem.Item[];
    customItem?: (props: { item: IInputItem.Item, [key: string]: any }) => JSX.Element;
    onSelect?: (eventKey: string | null, e: React.SyntheticEvent<unknown>) => void;
    onChange?: (value: IInputItem.Item) => void;
    onFocus?: React.FocusEventHandler<any>;
    activeItem?: IInputItem.Item;
    name: string;
    caption?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    label?: string | React.ReactNode;
    size?: 'sm' | 'lg';
    placeHolder?: string;
    required?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    loading?: boolean;
    error?: string | object | null | boolean;
    invalidFeedback?: string | JSX.Element;
    toolTip?: string | JSX.Element;
    menuToolTip?: string;
    maxHeight?: string;
    enableCustomInput?: boolean;
    customInputPlaceholder?: string;
    hideLabel?: boolean;
    highlightMissing?: boolean;
    onClickItem?: (item: IInputItem.Item) => boolean | void;
    tabIndex?: number;
}
export default function Select({ name, activeItem: _activeItem, error, loading, onSelect, customItem, mapToText, mapToValue, data, placeHolder: _placeHolder, onChange, className, readOnly, required, toolTip, onFocus, menuToolTip, maxHeight: _maxHeight, enableCustomInput, customInputPlaceholder, label, highlightMissing, onClickItem, tabIndex: _tabIndex, disabled, ...props }: Props) {

    const controlType = 'select';
    const ref = React.useRef(null);
    const { isEmpty } = useObject();
    const [activeItem, setActiveItem] = React.useState<IInputItem.Item | undefined>((_activeItem) ? _activeItem : undefined);
    // const [customInputValue, setCustomInputValue] = React.useState('');
    // const customInputRef = React.useRef(null);
    const [maxHeight] = React.useState((_maxHeight) ? _maxHeight : '400px');
    const [mappedItemData, setMappedItemData] = React.useState<IInputItem.Item[]>([]);
    const defaultPlaceHolder = 'Choose an Option';
    const placeHolder = (_placeHolder) ? _placeHolder : defaultPlaceHolder;
    const [displayValue, setDisplayValue] = React.useState((_activeItem) ? _activeItem.text : (placeHolder) ? placeHolder : placeHolder);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const form = useForm();
    const formGroup = useFormGroup();
    const isReadOnly = (formGroup?.readOnly) ? true : (readOnly) ? true : (disabled) ? true : false;
    const highlightDanger = (!activeItem && highlightMissing) ? true : false;
    const tabIndex = (_tabIndex) ? _tabIndex : (form.controlData.findIndex((control) => (control.name === name)) + 1);

    //handles custom dropdown toggle
    const customToggle = (nextShow: boolean, meta: { source: string | undefined, originalEvent?: React.SyntheticEvent | KeyboardEvent | MouseEvent }) => {
        const toggleId = (meta?.originalEvent as any)?.target?.id;
        if (meta.source === 'click' && nextShow) {
            setShowDropdown(true);
        }
        else if (meta.source === 'select' || (meta.source === 'rootClose' && (meta.originalEvent as any)?.srcElement?.nodeName !== 'INPUT') || toggleId !== name) {
            setShowDropdown(false);
        }
    }

    //maps item data to correct props
    const mapItemData = (data: { [key: string]: any }[]) => {
        if (mapToText !== undefined && mapToValue !== undefined) {
            const items: any[] = data?.map((item: any) => {
                return {
                    ...item,
                    text: item[mapToText] || '',
                    value: item[mapToValue] || 0,
                }
            })
            return items
        }
        return data;
    };

    const [isControlUpdated, setIsControlUpdate] = React.useState(false);
    const controlData: IForm.ControlData = {
        type: controlType,
        name: name,
        label: label,
        formGroup: formGroup.groupName,
        data: activeItem,
        required: (required) ? true : false,
        validation: form.generateValidationInfo({ type: controlType, isRequired: required, controlValue: activeItem, highlighted: highlightDanger }),
        updated: isControlUpdated
    }

    React.useEffect(() => {
        setMappedItemData(mapItemData(data));
    }, [data]);

    useNonInitialEffect(() => {
        if (activeItem) {
            if (onChange) {
                onChange(activeItem);
            };
            setDisplayValue(activeItem.text);
        }
    }, [activeItem]);

    //resets input
    useNonInitialEffect(() => {
        setActiveItem((_activeItem) ? _activeItem : undefined);
        setDisplayValue((_activeItem) ? _activeItem.text : (placeHolder) ? placeHolder : defaultPlaceHolder);
    }, [form.resetTrigger]);

    //changes placeHolder locale if language is changed (only if no option is picked)
    useNonInitialEffect(() => {
        if (!activeItem) {
            setDisplayValue((_activeItem) ? _activeItem.text : (placeHolder) ? placeHolder : defaultPlaceHolder);
        }
    }, [placeHolder]);

    //adds form data to store on mount
    React.useEffect(() => {
        form.appendFormData(controlData);
    }, []);

    //updates form data when value changes
    useNonInitialEffect(() => {
        setIsControlUpdate(true);
        form.editFormData({ ...controlData, updated: true });
    }, [activeItem]);

    //makes sure control data label is updated when language changes
    useNonInitialEffect(() => {
        form.editFormData(controlData);
    }, [label]);

    //update activeItem from outside of comp
    useNonInitialEffect(() => {
        if (_activeItem?.value !== activeItem?.value) {
            const activeItem = (_activeItem) ? _activeItem : undefined;
            const displayValue = (_activeItem) ? _activeItem.text : (placeHolder) ? placeHolder : defaultPlaceHolder;
            setActiveItem(activeItem);
            setDisplayValue(displayValue);
        }
    }, [_activeItem?.value]);

    //remove form data when component unmounts
    useCleanupEffect(() => {
        form.removeFormData(name);
    });

    return (
        <>
            <Dropdown
                className={`${styles?.controlDropdown} ${className}`}
                show={(isReadOnly) ? false : showDropdown}
                onToggle={customToggle}
                id={'fooMoo'}
            >
                <FormControl
                    {...props}
                    tabIndex={tabIndex}
                    forwardRef={ref}
                    name={name}
                    label={label}
                    as={'input'}
                    toolTip={toolTip}
                    value={activeItem?.text === undefined ? "" : activeItem?.text === 'All' || activeItem?.text === 'Todos' ? 'All' : activeItem?.text}
                    placeHolder={displayValue}
                    onFocus={(e) => {
                        setShowDropdown(true);
                        if (onFocus) {
                            onFocus(e);
                        }
                    }}
                    readOnly={isReadOnly}
                    required={required}
                    caretDown
                    enableDropdownToggle
                    highlightDanger={highlightDanger}
                    disabled={disabled}
                >
                </FormControl>
                <InputDropdown
                    maxHeight={maxHeight}
                    loading={loading}
                    error={error}
                    showChildren={(isEmpty(mappedItemData)) ? (enableCustomInput) ? true : false : true}
                    toolTip={(menuToolTip) ? menuToolTip : 'There is no data available.'}
                >
                    <>
                        {
                            (enableCustomInput) ?
                                <>
                                    <CustomInputItem
                                        name={name}
                                        onAdd={(item) => {
                                            setActiveItem(item);
                                            setShowDropdown(false);
                                        }}
                                        itemsToCheck={mappedItemData}
                                    />
                                    {
                                        (isEmpty(mappedItemData)) ?
                                            <>
                                                <ListItemDivider className={'p-0 m-0 mb-2'} />
                                                <InputToolTip message={(menuToolTip) ? menuToolTip : 'There is no data available.'} />
                                            </> : <></>
                                    }

                                </> : null
                        }
                        {
                            mappedItemData?.map((item: IInputItem.Item, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <InputItem
                                            item={item}
                                            text={item?.text}
                                            active={(activeItem?.text === item.text) ? true : false}
                                            as={customItem}
                                            tabIndex={tabIndex as any}
                                            onClick={() => {
                                                if (onClickItem) {
                                                    const shouldContinue = onClickItem(item);
                                                    if (shouldContinue === false) {
                                                        return false;
                                                    }
                                                }
                                                setActiveItem(item);
                                            }}
                                            onKeyDown={() => { setActiveItem(item); setShowDropdown(false); (ref?.current as any)?.focus(); }}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }
                    </>
                </InputDropdown>
            </Dropdown>
        </>
    )

}
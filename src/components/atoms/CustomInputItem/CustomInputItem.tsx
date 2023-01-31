import React from 'react';
import { IInputItem } from '../InputItem';
import Button from 'react-bootstrap/Button';
import FormControl from '../FormControl';

interface Props {
    name: string;
    placeHolder?: string;
    onAdd?: (item: IInputItem.Item, e?: React.MouseEvent) => void;
    addIcon?: JSX.Element;
    addLabel?: string;
    itemsToCheck: IInputItem.Item[];
    tabIndex?: number;
};

export default function CustomInputItem({ placeHolder, name, onAdd: _onAdd, itemsToCheck, tabIndex, addIcon, addLabel }: Props) {

    const customInputRef = React.useRef(null);
    const defaultItem = { value: '', text: '' };
    const [customItem, setCustomItem] = React.useState<IInputItem.Item>(defaultItem);

    const onAdd = (item: IInputItem.Item, e?: React.MouseEvent) => {
        const isInputValid = (itemsToCheck.find((item) => item.text.toString().toLowerCase() === customItem.value.toString().toLowerCase())) ? false : true;
        if (isInputValid) {
            if (_onAdd) {
                _onAdd(item, e);
            };
            setCustomItem(defaultItem);
        } else {
            setCustomItem({ value: '', text: '' });
        }
        if (customInputRef !== null) {
            (customInputRef.current as any).value = '';
        };
    };

    return (
        <>
            <div className={'d-flex justify-content-between p-2 ps-3 pb-3'}>
                <FormControl
                    tabIndex={tabIndex}
                    forwardRef={customInputRef}
                    name={`${name}_customInput`}
                    as={'input'}
                    placeHolder={(placeHolder) ? placeHolder : 'Add Custom Input'}
                    className={'flex-fill'}
                    onChange={(e) => setCustomItem({ text: e.target.value, value: e.target.value })}
                />
                <Button
                    tabIndex={tabIndex}
                    variant={'icon-only'}
                    disabled={(String(customItem.value).length > 0) ? false : true}
                    onClick={(e) => onAdd(customItem, e)}
                >{addIcon}{addLabel}</Button>
            </div>
        </>
    )
}

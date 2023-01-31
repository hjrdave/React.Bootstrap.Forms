import React from 'react';
//import Button from '../../button';
import uniqid from 'uniqid';
import useNonInitialEffect from 'react-cork/use-non-initial-effect';
import useFormList from './use-form-list';
import Store from './Store';
import { Col, Row, Button } from 'react-bootstrap';
import { withTreble } from 'treble-gsm';

interface Props {
    className?: string;
    addBtnLabel?: string;
    as: (props: {
        data: { [key: string]: any };
        onChange: (data: { [key: string]: any }) => void;
        [key: string]: any;
    }) => JSX.Element;
    data?: { [key: string]: any }[];
    defaultData: { [key: string]: any };
    [key: string]: any;
    noFirstRowDelete: boolean;
    onAdd?: () => void;
    onDelete?: (dataToDelete?: { [key: string]: any, ptrui_id: string }) => void;
    onChange?: (data: { [key: string]: any }[]) => void;
    children?: JSX.Element | JSX.Element[];
    tabIndex?: number;
};

function FormListComp({ className, as: CustomRow, data: _data, defaultData, onChange: _onChange, onDelete: _onDelete, onAdd: _onAdd, addBtnLabel, noFirstRowDelete, children, tabIndex, ...props }: Props) {


    const { listData, setListData } = useFormList((_data) ? _data.map((item) => ({ ...item, ptrui_id: uniqid() })) : []);

    function areEqualShallow(a: any, b: any) {
        for (var key in a) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }

    const onChange = (data: { [key: string]: any }) => {

        const updatedList = listData.map((item) => ((item.ptrui_id === data.ptrui_id) ? data : item));
        let isDifferent: boolean = false;
        for (let i = 0; i < listData.length; i++) {
            if (!(areEqualShallow(listData[i], updatedList[i]))) {
                isDifferent = true;
                break;
            }
        }
        if (isDifferent) {
            setListData(updatedList as any);
        }

    }

    const onAdd = () => {
        const updatedList = [...listData, { ...defaultData, ptrui_id: uniqid() }];
        if (_onAdd) {
            _onAdd();
        }
        setListData(updatedList as any);
    }

    const onDelete = (ptrui_id: string) => {
        const updatedList = listData.filter((item) => item.ptrui_id !== ptrui_id);
        if (_onDelete) {
            const itemToDelete = listData.filter((item) => item.ptrui_id === ptrui_id)[0];
            _onDelete(itemToDelete);
        }
        setListData(updatedList as any);
    }

    useNonInitialEffect(() => {
        if (_onChange) {
            _onChange(listData);
        };
    }, [listData]);

    useNonInitialEffect(() => {
        if (_data) {
            setListData(_data as any);
        };
    }, [_data]);




    return (
        <>
            <div className={`${className}`}>
                <div className={'d-flex justify-content-end'}>
                    {/* <Button.Add variant={'bg-none'} onClick={() => onAdd()} label={addBtnLabel} tabIndex={tabIndex} /> */}
                    <Button variant={'bg-none'} onClick={() => onAdd()} tabIndex={tabIndex}>{addBtnLabel}</Button>
                </div>
                <div>
                    <Col>
                        {
                            (children) ?
                                <Row className={'pt-2 m-0'}>
                                    <Col sm={11}>
                                        {children}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (listData?.length) ?
                                listData.map((item: { [key: string]: any }, index) => {

                                    return (
                                        <React.Fragment key={item.ptrui_id}>
                                            <>
                                                <Row className={'pt-2 m-0'}>
                                                    <Col sm={11}>
                                                        <CustomRow data={item} onChange={onChange} {...props} tabIndex={tabIndex} />
                                                    </Col>
                                                    <Col sm={1} className={'d-flex justify-content-start align-items-center'}>
                                                        {
                                                            (noFirstRowDelete && index === 0) ? null :
                                                                <i
                                                                    className="fa-solid fa-trash-can text-danger cursor"
                                                                    onClick={() => onDelete(item.ptrui_id)}
                                                                    tabIndex={tabIndex}
                                                                ></i>
                                                        }

                                                    </Col>
                                                </Row>
                                            </>
                                        </React.Fragment>
                                    )
                                }) : null
                        }
                    </Col>
                </div>

            </div>
        </>
    )
};
const FormList = withTreble(FormListComp, { store: Store });
export default FormList;

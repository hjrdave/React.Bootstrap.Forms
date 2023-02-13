import React from 'react';
//import Button from '../../button';
//import FontAwesomeIcon from '@fortawesome/fontawesome-free';
import uniqid from 'uniqid';
import useNonInitialEffect from 'react-cork/use-non-initial-effect';
import useFormList from './use-form-list';
import Store from './Store';
import { Col, Row, Button } from 'react-bootstrap';
import { withTreble } from 'treble-gsm';

interface Props {
    className?: string;
    addBtnIcon?: JSX.Element;
    addBtnLabel?: string;
    as: (props: {
        data: { [key: string]: any };
        onChange: (data: { [key: string]: any }) => void;
        [key: string]: any;
    }) => JSX.Element;
    data?: {
        [key: string]: any;
    }[];
    forwardProps?: { [key: string]: any };
    defaultRowCount?: number;
    noFirstRowDelete?: boolean;
    onAdd?: () => void;
    onDelete?: (dataToDelete?: {
        RBSKey: number,
        [key: string]: any,
    }) => void;
    onChange?: (data: {
        RBSKey: number,
        [key: string]: any
    }[]) => void;
    children?: JSX.Element | JSX.Element[];
    tabIndex?: number;
    max?: number;
};

function FormListComp({ className, as: CustomRow, data: _data, forwardProps, onChange: _onChange, onDelete: _onDelete, onAdd: _onAdd, addBtnLabel, addBtnIcon, noFirstRowDelete, children, tabIndex, max, defaultRowCount, ...props }: Props) {

    const defaultRows = (defaultRowCount) ? Array.from({ length: defaultRowCount }, (_, i) => ({ RBSKey: i })) : (noFirstRowDelete) ? [{ RBSKey: 1 }] : [];
    //This is used to generate keys for list items so deleted rows will persist correctly (RBSKey)
    const [RBSKeyArray, setRBSKeyArray] = React.useState<number[]>((_data) ? _data.map((_, index) => (index + 1)) : defaultRows.map((item) => item.RBSKey));

    const { listData, setListData } = useFormList((_data) ? _data.map((item, index) => ({ RBSKey: index, ...item })) : defaultRows);
    const canAddRows = max === undefined || listData.length < max;

    function areEqualShallow(a: any, b: any) {
        for (var key in a) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }

    const onChange = (data: { [key: string]: any }) => {

        const updatedList = listData.map((item) => ((item.RBSKey === data.RBSKey) ? data : item));
        let isDifferent: boolean = false;
        for (let i = 0; i < listData.length; i++) {
            if (!(areEqualShallow(listData[i], updatedList[i]))) {
                isDifferent = true;
                break;
            }
        }
        if (isDifferent) {
            setListData(updatedList);
        }

    }

    const onAdd = () => {
        if (canAddRows) {
            const updatedList = [...listData, { RBSKey: RBSKeyArray[RBSKeyArray.length - 1] + 1, ...forwardProps }];
            if (_onAdd) {
                _onAdd();
            }
            setRBSKeyArray([...RBSKeyArray, RBSKeyArray[RBSKeyArray.length - 1] + 1]);
            setListData(updatedList);
        }

    }

    const onDelete = (Id: string | number) => {
        const updatedList = listData.filter((item) => item.RBSKey !== Id);
        if (_onDelete) {
            const itemToDelete = listData.filter((item) => item.RBSKey === Id)[0];
            _onDelete(itemToDelete as any);
        }
        setListData(updatedList);
    }

    useNonInitialEffect(() => {
        if (_onChange) {
            _onChange(listData as any);
        };
    }, [listData]);

    useNonInitialEffect(() => {
        if (_data) {
            setListData(_data);
        };
    }, [_data]);




    return (
        <>
            <div className={`${className}`}>
                <div className={'d-flex justify-content-end'}>
                    {
                        (canAddRows) ?
                            <Button variant={'bg-none'} onClick={() => onAdd()} tabIndex={tabIndex}>
                                {(addBtnIcon) ? addBtnIcon : <i className="fa-solid fa-circle-plus text-success pe-2"></i>}
                                {addBtnLabel}
                            </Button> : null
                    }

                </div>
                <div>
                    <Col>
                        {
                            (children) ?
                                <Row className={'pt-0 m-0'}>
                                    <Col sm={11}>
                                        {children}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (listData?.length) ?
                                listData.map((item, index) => {

                                    return (
                                        <React.Fragment key={item.RBSKey}>
                                            <>
                                                <Row className={'pt-2 m-0'}>
                                                    <Col sm={11}>
                                                        <CustomRow {...forwardProps} data={{ index: item.RBSKey, ...item }} onChange={onChange} tabIndex={tabIndex} />
                                                    </Col>
                                                    <Col sm={1} className={'d-flex justify-content-start align-items-center'}>
                                                        {
                                                            (noFirstRowDelete && index === 0) ? null :
                                                                <i
                                                                    className="fa-solid fa-circle-minus text-danger"
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() => onDelete(item.RBSKey)}
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
const FormList = withTreble(FormListComp, { store: Store }) as typeof FormListComp;
export default FormList;

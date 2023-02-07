import React from 'react';
import { SplitButton, Dropdown } from 'react-bootstrap';
import styles from './InputPrependList.module.scss';

interface Props {
    className?: string;
    itemClassName?: string;
    title?: string;
    id?: string;
    size?: "sm" | "lg";
    onChange?: (selectedItem: { text?: string; value?: string }) => void;
    items?: {
        text?: string;
        value?: string;
    }[]
};

export default function InputPrependList({ title, id, size, onChange, items, className, itemClassName }: Props) {

    const [selectedItem, setSelectedItem] = React.useState<{ text?: string; value?: string }>();

    React.useEffect(() => {
        if (onChange && selectedItem) {
            onChange(selectedItem);
        }
    }, [selectedItem]);

    return (
        <>
            <div className={`d-flex ${styles.compContainer} ${className}`}>
                <SplitButton
                    className={`${styles.compContainer} ${className}`}
                    variant="outline-secondary"
                    title={title}
                    id={id}
                    size={size}
                >
                    {
                        items?.map((item, index) => (
                            <React.Fragment key={index}>
                                <Dropdown.Item
                                    itemClassName={itemClassName}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {item.text}
                                </Dropdown.Item>
                            </React.Fragment>
                        ))
                    }
                </SplitButton>
            </div>
        </>
    )
}
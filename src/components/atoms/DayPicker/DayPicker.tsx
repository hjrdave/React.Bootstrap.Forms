import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { default as DayPickerComp, Modifiers } from "react-day-picker";

import 'react-day-picker/lib/style.css';
import styles from './DayPicker.module.scss';

interface Props {
    range?: any;
    dateRange?: any;
    selectedDay?: any;
    modifiers?: Modifiers;
    onClick?: any;
    onReset: any;
    onTodayClick: any;
    date?: Date;
    captionElement?: (props: { date?: Date; onChange?: (date: Date) => void }) => JSX.Element;
    initialDate?: Date;
    tabIndex?: number;
}
export default function DayPicker({ range, dateRange, selectedDay, modifiers, onClick, onReset, onTodayClick, captionElement: CaptionElement, initialDate, tabIndex }: Props) {

    const [month, setMonth] = useState((range) ? dateRange?.from : selectedDay);
    const handleYearMonthChange = (month: any) => {
        setMonth(month);
    }

    const weekdayShort = ['Mo', 'Su', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <>
            <div className={`d-flex justify-content-center`}>
                <div>
                    {/* <DayPickerComp
                        weekdaysShort={weekdayShort}
                        month={month}
                        className={styles.compContainer}
                        numberOfMonths={1}
                        selectedDays={(range) ? [dateRange?.from, { ...dateRange }] : selectedDay}
                        modifiers={modifiers}
                        onDayClick={onClick}
                        captionElement={({ date }: any) => ((CaptionElement) ? <CaptionElement date={date as any} onChange={handleYearMonthChange} /> : null)}
                        disabledDays={{ before: (initialDate ? initialDate as any : undefined) }}
                    /> */}
                    <div className="d-flex justify-content-start pb-2 px-2">
                        <Button
                            tabIndex={tabIndex}
                            className="me-1"
                            onClick={() => setMonth(onReset())}
                            variant={'link'}
                        >
                            Reset
                        </Button>
                        <Button
                            tabIndex={tabIndex}
                            className="me-1"
                            onClick={() => setMonth(onTodayClick())}
                            variant={'link'}
                        >
                            Today
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
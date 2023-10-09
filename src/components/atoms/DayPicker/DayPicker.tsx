import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  DayPicker as DayPickerComp,
  DayClickEventHandler,
  FooterProps,
  Matcher,
} from "react-day-picker";
import useDateTime from "./useDateTime";
import reactDayPickerStyles from "react-day-picker/dist/style.module.css";
import styles from "./DayPicker.module.scss";

interface Props {
  onSelect: (selectedDay?: string) => void;
  onDayClick?: DayClickEventHandler;
  initialDate?: string;
  disabled?: Matcher | Matcher[];
  className?: string;
}
export default function DayPicker({
  onSelect,
  onDayClick,
  initialDate,
  disabled,
  className,
}: Props) {
  const dateTime = useDateTime();
  const _initialDate = initialDate ? new Date(initialDate) : undefined;
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    _initialDate
  );

  React.useEffect(() => {
    const formattedDate = selectedDay
      ? dateTime.formatDate(selectedDay)
      : undefined;
    onSelect?.(formattedDate);
  }, [selectedDay]);

  const FooterComp = (props: FooterProps) => (
    <>
      <div className="d-flex justify-content-center pb-2 px-2">
        <Button
          className="me-1"
          onClick={() =>
            setSelectedDay(initialDate ? new Date(initialDate) : undefined)
          }
          variant={"link"}
        >
          Reset
        </Button>
        <Button
          className="me-1"
          onClick={() => setSelectedDay(new Date())}
          variant={"link"}
        >
          Today
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className={`d-flex justify-content-center ${className}`}>
        <DayPickerComp
          classNames={{ ...reactDayPickerStyles }}
          mode="single"
          onSelect={setSelectedDay}
          selected={selectedDay}
          onDayClick={onDayClick}
          showOutsideDays
          footer={<FooterComp />}
          modifiersClassNames={{
            selected: styles.selectedDay,
          }}
          disabled={disabled}
        />
      </div>
    </>
  );
}

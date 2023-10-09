import React from "react";
import useNonInitialEffect from "react-cork/useNonInitialEffect";
import useTimePicker from "./useTimePicker";
///import styles from './timePicker.module.scss';

interface Props {
  format?: 12 | 24;
  interval?: 15 | 30;
  onChange?: (option: { text: string; value: string }) => void;
  defaultValue?: { value: string; text: string };
  onClickItem?: (item: any) => boolean | void;
  onKeyDown?: (e: any) => void;
  tabIndex?: number;
}

export default function TimePicker({
  format,
  interval,
  onChange,
  defaultValue,
  onClickItem,
  onKeyDown,
  tabIndex,
}: Props) {
  const { createTime } = useTimePicker();

  const [activeOption, setActiveOption] = React.useState<{
    value: string;
    text: string;
  }>(defaultValue ? defaultValue : { text: "", value: "" });

  useNonInitialEffect(() => {
    if (onChange) {
      onChange(activeOption);
    }
  }, [activeOption]);

  return (
    <>
      <div className={`d-flex p-0 m-0`}>
        <div style={{ width: "100%" }}>
          {createTime(format, interval).map((option, index) => {
            return (
              <React.Fragment key={index}>
                {/* <InputItem
                                        item={option}
                                        text={option.text}
                                        active={(option.text === activeOption.text) ? true : false}
                                        //className={styles.dropdownItem}
                                        tabIndex={tabIndex as any}
                                        onClick={() => {
                                            if (onClickItem) {
                                                const shouldContinue = onClickItem(option);
                                                if (shouldContinue === false) {
                                                    return false;
                                                }
                                            }
                                            setActiveOption(option);
                                        }}
                                        onKeyDown={(e) => {
                                            setActiveOption(option);
                                            if (onKeyDown) {
                                                onKeyDown(e);
                                            }
                                        }}
                                    /> */}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

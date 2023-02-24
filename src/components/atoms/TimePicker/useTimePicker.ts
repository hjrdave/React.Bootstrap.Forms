import React from "react";

const useTimePicker = () => {

    const extractTimePeriod = (defaultValue: { text: string, value: string }) => {
        return defaultValue.text.split(' ')[1] as 'PM' | 'AM';
    }

    const convertTimeBackTo24 = (time: string, timePeriod: 'PM' | 'AM') => {
        const timeArray = time.split(':');
        const timeInteger = parseInt(timeArray[0]);
        const newTimeInteger = (timePeriod === 'PM') ? (timeInteger === 12) ? timeInteger : timeInteger + 12 : (timeInteger === 12) ? 0 : timeInteger;
        const convertedTime = `${newTimeInteger}:${timeArray[1]}`;
        const formattedTime = (convertedTime.length === 4) ? `0${convertedTime}` : convertedTime;
        return formattedTime;
    };


    const convertToStandard = (value: string) => {
        const time = value.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
        return timeValue || '';

    }

    const createTime = (type?: 12 | 24, step?: 15 | 30) => {
        const array = new Array(24).fill(1);
        let options: { value: string, text: string }[] = [];

        array.map((item, index) => {
            const value: string = (index <= 9) ? (index === 0) ? '0000' : `0${(100 * index)}` : `${(100 * index)}`;
            const firstValue1 = value.substring(0, 2);
            const prependValue1 = '00';
            const prependValue2 = '15';
            const prependValue3 = '30';
            const prependValue4 = '45';
            const formattedValue1 = `${firstValue1}:${prependValue1}`;
            const formattedValue2 = `${firstValue1}:${prependValue2}`;
            const formattedValue3 = `${firstValue1}:${prependValue3}`;
            const formattedValue4 = `${firstValue1}:${prependValue4}`;
            if (type === 12) {
                if (step === 30) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: convertToStandard(formattedValue1) },
                        { value: formattedValue3, text: convertToStandard(formattedValue3) }
                    ];
                } else if (step === 15) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: convertToStandard(formattedValue1) },
                        { value: formattedValue2, text: convertToStandard(formattedValue2) },
                        { value: formattedValue3, text: convertToStandard(formattedValue3) },
                        { value: formattedValue4, text: convertToStandard(formattedValue4) }
                    ];
                }
                return options = [...options, { value: formattedValue1, text: convertToStandard(formattedValue1) }];
            } else if (type === 24) {
                if (step === 30) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: formattedValue1 },
                        { value: formattedValue3, text: formattedValue3 }
                    ];
                } else if (step === 15) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: formattedValue1 },
                        { value: formattedValue2, text: formattedValue2 },
                        { value: formattedValue3, text: formattedValue3 },
                        { value: formattedValue4, text: formattedValue4 }
                    ];
                }
                return options = [...options, { value: formattedValue1, text: formattedValue1 }];
            } else {
                if (step === 30) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: `${convertToStandard(formattedValue1)} (${formattedValue1})` },
                        { value: formattedValue3, text: `${convertToStandard(formattedValue3)} (${formattedValue3})` }
                    ];
                } else if (step === 15) {
                    return options = [
                        ...options,
                        { value: formattedValue1, text: `${convertToStandard(formattedValue1)} (${formattedValue1})` },
                        { value: formattedValue2, text: `${convertToStandard(formattedValue2)} (${formattedValue2})` },
                        { value: formattedValue3, text: `${convertToStandard(formattedValue3)} (${formattedValue3})` },
                        { value: formattedValue4, text: `${convertToStandard(formattedValue4)} (${formattedValue4})` }
                    ];
                }
                return options = [...options, { value: formattedValue1, text: `${convertToStandard(formattedValue1)} (${formattedValue1})` }];
            }
        });
        return options;
    }

    return ({
        extractTimePeriod,
        convertTimeBackTo24,
        createTime
    })
}

export default useTimePicker;
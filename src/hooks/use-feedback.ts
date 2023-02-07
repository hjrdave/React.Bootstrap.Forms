import React from "react";
import { useNumber } from "react-cork";
interface Options {

}
const useFeedback = (options?: Options) => {

    const number = useNumber();

    const [msg, setMsg] = React.useState<string | undefined>();

    const checkRange = (value: any, min?: number, max?: number) => {
        if ((min !== undefined) && (max !== undefined) && !(number.isInRange(value, [min, max]))) {
            setMsg(`Value must be between ${min} and ${max}.`);
        }
        if (min !== undefined && (value < min)) {
            setMsg(`Value must be greater than ${min}.`);
        }
        if (max !== undefined && (value > max)) {
            setMsg(`Value must be less than ${max}.`);
        }
    }
    return {
        checkRange,
        msg
    }
};
export default useFeedback;
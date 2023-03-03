import { useInput, useNonInitialEffect, useDebounce } from "react-cork";

const useControlledInput = (inputValue?: any, onChange?: (e: any) => void, debounceTime?: number) => {

    const { value: controlValue, setValue: setControlValue, reset, bind: _bind } = useInput(inputValue ?? "");
    const onDebounceChange = useDebounce(onChange, debounceTime ?? 200);
    const _onChange = (e: any) => {
        _bind.onChange(e);
        if (onChange) {
            onDebounceChange(e);
        }
    };
    const bind = { ..._bind, ...{ onChange: _onChange } }

    useNonInitialEffect(() => {
        setControlValue(inputValue);
    }, [inputValue]);

    return {
        controlValue,
        setControlValue,
        reset,
        bind
    }
};

export default useControlledInput;
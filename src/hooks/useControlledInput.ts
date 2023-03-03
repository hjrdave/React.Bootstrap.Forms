import React from 'react';
import { useInput, useNonInitialEffect, useDebounce, useSessionStorage, useCleanupEffect } from "react-cork";
interface Options {
    name: string;
    inputValue?: any;
    onChange?: (e: any) => void;
    debounceTime?: number;
    persistValue?: boolean;
}
const useControlledInput = (options: Options) => {

    const { name, inputValue, onChange, debounceTime, persistValue } = options;
    const sessionKey = `RBF-${name}`;
    const session = useSessionStorage();
    const { value: controlValue, setValue: setControlValue, reset, bind: _bind } = useInput(inputValue ?? "");

    const onDebounceChange = useDebounce((e: any) => {
        onChange?.(e);
        persistValue ? session.set(sessionKey, e.target.value ?? "") : null;
    }, debounceTime ?? 200);

    const _onChange = (e: any) => {
        _bind.onChange(e);
        if (onChange) {
            onDebounceChange(e);
        }
    };
    const bind = { ..._bind, ...{ onChange: _onChange } }

    React.useMemo(() => {
        (persistValue) ? setControlValue(session.get(sessionKey)) : session.remove(sessionKey);
    }, []);

    useNonInitialEffect(() => {
        setControlValue(inputValue);
    }, [inputValue]);

    useNonInitialEffect(() => {

    }, [controlValue]);

    return {
        controlValue,
        setControlValue,
        reset,
        bind
    }
};

export default useControlledInput;
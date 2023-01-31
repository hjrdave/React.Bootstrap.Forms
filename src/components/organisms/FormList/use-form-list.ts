import React from 'react';
import { useFormListProvider } from './Store';
const useFormList = (initialData: { [key: string]: any }) => {

    const [State, Store, Util] = useFormListProvider();

    const listData = State.listData;
    const setListData = (data: { [key: string]: any }) => {
        if (State && Store && Util) {
            Store.update(Util.actions.setListData, data);
        };
    }

    React.useEffect(() => {
        if (initialData.length > 0) {
            setListData(initialData);
        };
    }, []);

    return {
        setListData,
        listData
    }
}

export default useFormList;
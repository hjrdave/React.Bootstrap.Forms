import { useFormGroupProvider } from './Store';
const useFormGroup = () => {

    const [State, Store, Util] = useFormGroupProvider();
    const groupName = State?.groupName;
    const readOnly = (State?.readOnly) ? true : false;

    const setGroupName = (name: string) => {
        if (State && Store && Util) {
            Store.update(Util.actions.setGroupName, name);
        }
    }
    const setReadOnly = (isReadOnly: boolean) => {
        if (State && Store && Util) {
            Store.update(Util.actions.setReadOnly, isReadOnly);
        }
    }

    return {
        groupName,
        setGroupName,
        readOnly,
        setReadOnly
    }
}

export default useFormGroup;
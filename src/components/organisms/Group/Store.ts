import { useScopedTreble, createStore, useTreble, TrebleGSM, createScopedTreble } from 'treble-gsm';
import { TrebleLM } from 'treble-list-manager';

export interface IStoreItems {
    groupName?: string;
    readOnly?: string;
}
const actionKeys = {
    ['setGroupName']: 'setGroupName',
    ['setReadOnly']: 'setReadOnly'
}
type TStoreActions = typeof actionKeys;
export interface IUtilities extends TrebleGSM.Utilities<TStoreActions> { };
export interface IDispatchers extends TrebleGSM.Dispatchers, TrebleLM.Dispatchers { };
const FormGroupContext = createScopedTreble();
const useFormGroupProvider = () => useTreble<IStoreItems, IDispatchers, IUtilities>(FormGroupContext);

const Store = createStore([
    {
        action: actionKeys.setGroupName,
        state: {
            groupName: undefined
        }
    },
    {
        action: actionKeys.setReadOnly,
        state: {
            readOnly: false
        }
    }
], {
    context: FormGroupContext
});

export { useFormGroupProvider };
export default Store;
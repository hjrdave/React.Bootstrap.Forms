import { useScopedTreble, createStore, useTreble, TrebleGSM } from 'treble-gsm';
import { TrebleLM } from 'treble-list-manager';

export interface IStoreItems {
    listData: { [key: string]: any, ptrui_id: string }[];
}
const actionKeys = {
    ['setListData']: 'setListData'
}
type TStoreActions = typeof actionKeys;
export interface IUtilities extends TrebleGSM.Utilities<TStoreActions> { };
export interface IDispatchers extends TrebleGSM.Dispatchers, TrebleLM.Dispatchers { };
const FormListContext = useScopedTreble();
const useFormListProvider = () => useTreble<IStoreItems, IDispatchers, IUtilities>(FormListContext);

const Store = createStore([
    {
        action: actionKeys.setListData,
        state: {
            listData: []
        }
    }
], {
    context: FormListContext
});

export { useFormListProvider };
export default Store;
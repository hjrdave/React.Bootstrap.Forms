import { useScopedTreble, createStore, useTreble, TrebleGSM } from 'treble-gsm';
import TrebleListManager, { TrebleLM } from 'treble-list-manager';
import IForm from './interfaces';

export interface IStoreItems {
    resetTrigger: 0 | 1;
    readOnly: boolean;
    loading: boolean;
    controlData: IForm.ControlData[];
    groupNames: string[];
    resetOnSubmit: boolean;
    isSubmitBtnDisabled: boolean;
}
const actionKeys = {
    toggleReset: 'toggleReset',
    updateReadOnly: 'updateReadOnly',
    updateLoading: 'updateLoading',
    updateControlData: 'updateControlData',
    updateGroupNames: 'updateGroupNames',
    setResetOnSubmit: 'setResetOnSubmit',
    setIsSubmitBtnDisabled: 'setIsSubmitBtnDisabled'
}
type TStoreActions = typeof actionKeys;
export interface IUtilities extends TrebleGSM.Utilities<TStoreActions> { };
export interface IDispatchers extends TrebleGSM.Dispatchers, TrebleLM.Dispatchers { };
const useFormProvider = () => useTreble<IStoreItems, IDispatchers, IUtilities>();

const Store = createStore([
    {
        action: actionKeys.toggleReset,
        state: {
            resetTrigger: 0
        }
    },
    {
        action: actionKeys.updateReadOnly,
        state: {
            readOnly: false
        }
    },
    {
        action: actionKeys.updateLoading,
        state: {
            loading: false
        }
    },
    {
        action: actionKeys.updateControlData,
        state: {
            controlData: []
        }
    },
    {
        action: actionKeys.updateGroupNames,
        state: {
            groupNames: []
        },
        features: {
            check: (data) => {
                if (data.dispatchPayload.type !== 'remove') {
                    if (data.currentState.includes(data.dispatchValue)) {
                        return false
                    } else {
                        return true
                    }
                }
                return true;
            }
        }
    },
    {
        action: actionKeys.setResetOnSubmit,
        state: {
            resetOnSubmit: false
        }
    },
    {
        action: actionKeys.setIsSubmitBtnDisabled,
        state: {
            isSubmitBtnDisabled: false
        }
    },
], {
    modules: [TrebleListManager]
});

export { useFormProvider };
export default Store;
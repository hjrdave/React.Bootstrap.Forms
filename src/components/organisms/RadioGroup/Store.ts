import { useScopedTreble, createStore, useTreble, TrebleGSM, createScopedTreble } from 'treble-gsm';
import { TrebleLM } from 'treble-list-manager';

export interface IStoreItems {
    name: string;
    isDisabled?: string;
    onChange?: (value: { text?: string | React.ReactNode, value: any }) => void;
    disabled?: boolean;
    value?: { text?: string | React.ReactNode, value: any };
    required?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    highlightMissing?: boolean;
    tabIndex?: number;
}
const actionKeys = {
    ['setName']: 'setName',
    ['setIsDisabled']: 'setIsDisabled',
    ['setOnChange']: 'setOnChange',
    ['updateValue']: 'updateValue',
    ['setRequired']: 'setRequired',
    ['setIsValid']: 'setIsValid',
    ['setIsInvalid']: 'setIsInvalid',
    ['setHighlightMissing']: 'setHighlightMissing',
    ['setTabIndex']: 'setTabIndex'
}
type TStoreActions = typeof actionKeys;
export interface IUtilities extends TrebleGSM.Utilities<TStoreActions> { };
export interface IDispatchers extends TrebleGSM.Dispatchers, TrebleLM.Dispatchers { };
const RadioGroupContext = createScopedTreble();
const useRadioGroupProvider = () => useTreble<IStoreItems, IDispatchers, IUtilities>(RadioGroupContext);

const Store = createStore([
    {
        action: actionKeys.setName,
        state: {
            name: ''
        }
    },
    {
        action: actionKeys.setIsDisabled,
        state: {
            isDisabled: false
        }
    },
    {
        action: actionKeys.setIsDisabled,
        state: {
            isDisabled: false
        }
    },
    {
        action: actionKeys.setOnChange,
        state: {
            onChange: undefined
        }
    },
    {
        action: actionKeys.updateValue,
        state: {
            value: undefined
        }
    },
    {
        action: actionKeys.setRequired,
        state: {
            required: undefined
        }
    },
    {
        action: actionKeys.setIsValid,
        state: {
            isValid: undefined
        }
    },
    {
        action: actionKeys.setIsInvalid,
        state: {
            isInValid: undefined
        }
    },
    {
        action: actionKeys.setHighlightMissing,
        state: {
            highlightMissing: undefined
        }
    },
    {
        action: actionKeys.setTabIndex,
        state: {
            tabIndex: undefined
        }
    }
], {
    context: RadioGroupContext
});

export { useRadioGroupProvider };
export default Store;
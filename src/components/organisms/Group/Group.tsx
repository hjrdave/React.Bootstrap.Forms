import React from 'react';
import { withTreble } from 'treble-gsm';
import Store from './Store';
import useFormGroup from './use-form-group';
import useForm from '../../../use-form';
import { useCleanupEffect } from 'react-cork';

interface Props {
    children?: JSX.Element | JSX.Element[];
    readOnly?: boolean;
    name: string;
}
function GroupComp({ children, readOnly, name }: Props) {

    const form = useForm();
    const group = useFormGroup();

    React.useEffect(() => {
        group.setGroupName(name);
        form.appendGroupName(name);
    }, []);

    React.useEffect(() => {
        group.setReadOnly((readOnly) ? true : false);
    }, [readOnly]);

    useCleanupEffect(() => {
        form.removeGroupName(name);
    });

    return (
        <>
            <fieldset>
                {(group.groupName) ? children : null}
            </fieldset>
        </>
    )
}

const Group = withTreble(GroupComp, { store: Store });
export default Group;
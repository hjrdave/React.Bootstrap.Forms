import React from "react";
import { useNonInitialEffect } from "react-cork";
import FormControl, { FormControlProps } from "../../atoms/FormControl";
import useControlledInput from "../../../hooks/useControlledInput";

interface Props extends FormControlProps {}

export default function TextArea({
  value,
  name,
  onChange,
  debounceTime,
  ...props
}: Props) {
  const _name = name;
  const [_value] = React.useState(value);
  const { controlValue, setControlValue } = useControlledInput({
    name: name,
    inputValue: value,
    onChange: onChange,
    debounceTime: debounceTime,
  });

  useNonInitialEffect(() => {
    setControlValue(controlValue);
  }, [controlValue]);

  return (
    <>
      <FormControl {...props} as={"textarea"} name={_name} value={_value} />
    </>
  );
}

import { cloneElement } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactElement;
};

function FormButton({ children }: Props) {
  const { pending } = useFormStatus();
  const childrenWithDisabled = cloneElement(children, { disabled: pending });
  return <>{childrenWithDisabled}</>;
}

export default FormButton;

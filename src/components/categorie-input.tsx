import { INSTRUCTORI } from "@/lib/constants";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type CategorieInputProps = {
  label: string;
  redobandire: boolean;
  checked?: CheckedState;
  value?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  onCheckedChange?: (checked: CheckedState) => void;
};

function CategorieInput({
  label,
  redobandire,
  checked,
  value,
  disabled,
  onValueChange,
  onCheckedChange,
}: CategorieInputProps) {
  return (
    <div className="flex w-56 justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`cat${label}`}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
        <label
          htmlFor={`cat${label}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
      {redobandire || (
        <Select
          disabled={!checked || disabled}
          onValueChange={onValueChange}
          value={value || undefined}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Instructor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Instructori</SelectLabel>
              {INSTRUCTORI.map((instructor) => (
                <SelectItem key={instructor} value={instructor}>
                  {instructor}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

export default CategorieInput;

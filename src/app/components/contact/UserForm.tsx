import { FormWrapper } from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserData = {
  firstName: string;
  lastName: string;
  age: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserFrom({
  firstName,
  lastName,
  age,
  updateFields,
}: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <Label>First Name</Label>
      <Input
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <Label>Last Name</Label>
      <Input
        required
        type="text"
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <Label>Age</Label>
      <Input
        required
        min={1}
        type="number"
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      />
    </FormWrapper>
  );
}

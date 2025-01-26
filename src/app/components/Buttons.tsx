import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type ButtonsProps = {
  color: string;
  primary: string;
  secondary: string;
};

const Buttons: React.FC<ButtonsProps> = ({ color = "dark", primary, secondary}) => {
  return (
    <div className="flex gap-5 w-max">
      <PrimaryButton text={primary}/>
      <SecondaryButton color={color} text={secondary}/>
    </div>
  );
};

export default Buttons;

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type ButtonsProps = {
  color: string;
  primary: string;
  secondary: string;
  center: string;
};

const Buttons: React.FC<ButtonsProps> = ({ color = "dark", primary, secondary,center}) => {
  const justifyClass = center === "yes"? "items-center justify-center":"";
  return (
    <div className={`flex gap-5 w-full max-w-max flex-wrap ${justifyClass}`}>
      <PrimaryButton text={primary}/>
      <SecondaryButton color={color} text={secondary}/>
    </div>
  );
};

export default Buttons;

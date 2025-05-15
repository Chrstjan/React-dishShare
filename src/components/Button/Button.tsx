import s from "./Button.module.scss";

interface ButtonInterface {
  action: () => void;
  type?: string;
  text: string;
}

export const Button = ({ text, type, action }: ButtonInterface) => {
  return (
    <button
      onClick={action}
      className={`${s.buttonStyling} ${type ? s[type] : ""}`}
    >
      {text}
    </button>
  );
};

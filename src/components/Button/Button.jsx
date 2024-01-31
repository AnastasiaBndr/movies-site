import { ButtonStyled } from './Button.styled';

const Button = ({
  children,
  onClick,
  secondary,
  disabled,
  paddingX,
  paddingY,
  fontSize,
}) => {
  const handleClick = () => {
    document.activeElement.blur();
    onClick?.();
  };
  return (
    <ButtonStyled
      $secondary={secondary}
      $disabled={disabled}
      disabled={disabled}
      $paddingY={paddingY}
      $paddingX={paddingX}
      $fontSize={fontSize}
      onClick={handleClick}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;

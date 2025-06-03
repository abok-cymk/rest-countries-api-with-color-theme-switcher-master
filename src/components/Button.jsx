import PropTypes from "prop-types";
import { memo } from "react";

const Button = ({
  text,
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2  
        transition-all duration-200 cursor-pointer 
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {text && <span className="text-[0.875rem] font-800">{text}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default memo(Button);

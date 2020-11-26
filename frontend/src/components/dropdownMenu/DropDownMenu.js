import React, { useRef, useState } from "react";
import classes from "./DropDownMenu.module.scss";
import cs from "classnames";
import useClickOutsideAlert from "../../hooks/useClickOutside";

const DropDownMenu = ({ maxHeight, options = [], onSelect, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutsideAlert(menuRef, () => setIsOpen(false));

  const handleOptionSelected = (e, option, index) => {
    e.stopPropagation();
    onSelect(option, index);
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      onClick={() => setIsOpen(!isOpen)}
      className={classes.dropDownMenuContainer}
    >
      {props.children}
      <div
        style={{ maxHeight }}
        className={cs(classes.dropDownMenu, { [classes.open]: isOpen })}
      >
        {options.map((o, index) => (
          <MenuItem
            key={`menu-item-${o}-${index}`}
            text={o}
            onClick={(e) => handleOptionSelected(e, o, index)}
          />
        ))}
      </div>
    </div>
  );
};

const MenuItem = ({ text, ...props }) => {
  return (
    <div className={classes.menuItem} {...props}>
      {text}
    </div>
  );
};

export default DropDownMenu;

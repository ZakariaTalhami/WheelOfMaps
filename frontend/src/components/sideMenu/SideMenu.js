import React, { useEffect, useState } from 'react';
import classes from './SideMenu.module.scss';
import cs from 'classnames';

const SideMenu = ({open, className, ...props}) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [open]); // update the isOpen when there are new children

    const handleOpenToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={cs(classes.sideMenu, className, {[classes.open]: isOpen})} {...props}>
            <div className={classes.toggleButton} onClick={handleOpenToggle}>
                <i className="icon-burger"></i>
            </div>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
}

export default SideMenu;
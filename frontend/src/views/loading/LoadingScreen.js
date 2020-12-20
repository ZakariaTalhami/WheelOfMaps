import React from "react";
import classes from "./LoadingScreen.module.scss";
import { ReactComponent as WotIcon } from "../../assets/icons/Wheel-icon-large.svg";

const LoadingScreen = () => {
    return (
        <div className={classes.loadingScreen}>
            <div className={classes.loadingIcon}>
                <WotIcon />
            </div>
            <div className={classes.loadingText}>
                <svg width="215">
                    <text x="0" y="32">
                        Loading Map...
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default LoadingScreen;

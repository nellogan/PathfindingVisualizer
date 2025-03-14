import React, { useState, useEffect, useCallback } from "react";
import "./Dropdown.css"
import "../ControlPanel/ControlPanel.css"

export default function Dropdown(props) {
    const { title, liClassNameArg, buttonClassNameArg, options, callbackFn } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setIsOpen(false);
        callbackFn(value);
    };

    const handleOnMouseLeave = () => {
        setIsOpen(false);
    };

    /*  Explicitly use visibility: hidden for the dropdown menu so that screen readers can see choices before activating
    button. --> style={ isOpen ? null : {visibility: "hidden"}.*/
    return (
        <li className={liClassNameArg} onMouseLeave={() => setIsOpen(false)}>
            <button className={buttonClassNameArg} onClick={() => setIsOpen(true)}>
                { title }
            </button>
            <div className="dropdown-menu" style={ isOpen ? null : {visibility: "hidden"} }>
                <ul className="dropdown-ul">
                    { options.map((option) => (
                        <li className="dropdown-item" key={option} onClick={() => handleSelect(option)}>
                            { option }
                        </li>
                    )) }
                </ul>
            </div>
        </li>
    );
}

import React from 'react';
import classes from './Backdrop.module.css';
const Backdrop = (props) => {
    const cls = [
        classes.Backdrop
    ];
    if (props.isOpen) {
        cls.push(classes.isOpen);
    }
    return (React.createElement("div", { className: cls.join(' '), onClick: props.navToggleHandler }));
};
export default Backdrop;
//# sourceMappingURL=Backdrop.js.map
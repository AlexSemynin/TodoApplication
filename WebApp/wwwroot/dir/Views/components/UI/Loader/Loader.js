import React from 'react';
import classes from './Loader.module.scss';
const Loader = (props) => {
    const cls = [
        classes.Loader
    ];
    if (props.isActive) {
        cls.push(classes.active);
    }
    ;
    return (React.createElement("div", { className: cls.join(' ') },
        React.createElement("div", null),
        React.createElement("div", null)));
};
export default Loader;
//# sourceMappingURL=Loader.js.map
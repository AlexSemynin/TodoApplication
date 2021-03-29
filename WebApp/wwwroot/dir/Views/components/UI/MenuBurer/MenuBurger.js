import React from 'react';
import classes from './MenuBurger.module.scss';
const MenuBurger = (props) => {
    const cls = [
        classes.MenuBurger,
        'fa'
    ];
    if (props.isOpen) {
        cls.push('fa-times', classes.isOpen);
    }
    else {
        cls.push('fa-bars');
    }
    return (React.createElement("i", { className: cls.join(' '), onClick: props.onNavToggle }));
};
export default MenuBurger;
//# sourceMappingURL=MenuBurger.js.map
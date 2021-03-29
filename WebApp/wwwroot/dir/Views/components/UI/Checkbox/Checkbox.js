import { inject, observer } from 'mobx-react';
import React from 'react';
import classes from './Checkbox.module.scss';
const Checkbox = inject("LayoutStore")(observer((props) => {
    var _a, _b;
    const cls = [
        classes.knobs
    ];
    const [checked, setChecked] = React.useState(((_a = props.LayoutStore) === null || _a === void 0 ? void 0 : _a.Theme) == "Light");
    const changeTheme = (checked) => {
        var _a;
        const theme = !checked ? "Light" : "Dark";
        setChecked(!checked);
        (_a = props.LayoutStore) === null || _a === void 0 ? void 0 : _a.SwitchTheme(theme);
    };
    checked ?
        cls.push('fas fa-sun')
        : cls.push('fas fa-moon');
    console.log((_b = props.LayoutStore) === null || _b === void 0 ? void 0 : _b.Theme);
    // const checked = props.LayoutStore?.Theme == "Light" ? true : false;     
    return (React.createElement("div", { className: classes.Checkbox },
        React.createElement("input", { type: "checkbox", className: cls.join(' '), defaultChecked: checked, onClick: () => changeTheme(checked) }),
        React.createElement("div", { className: cls.join(' ') }),
        React.createElement("div", { className: classes.layer }))
    // <div className={classes.Checkbox}>
    //     <input type="checkbox"/>
    //     <div className={classes.knobs}></div>
    //     <div className={classes.layer}></div>
    // </div>
    );
}));
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map
import { inject, observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';
import LayoutStore, {ITheme} from 'Store/LayoutStore';
import classes from './Checkbox.module.scss';

const Checkbox = inject("LayoutStore")(observer((props: {LayoutStore?: LayoutStore}) =>{

    const cls = [
        classes.knobs
    ];
    const [checked, setChecked] = React.useState(props.LayoutStore?.Theme == "Light");

    const changeTheme = (checked: boolean) => {
        const theme: ITheme = !checked ? "Light" : "Dark";
        setChecked(!checked)
        props.LayoutStore?.SwitchTheme(theme);
    };

    checked ? 
        cls.push('fas fa-sun') 
        : cls.push('fas fa-moon');
    console.log(props.LayoutStore?.Theme);
    // const checked = props.LayoutStore?.Theme == "Light" ? true : false;     
    return(
        <div className={classes.Checkbox}>
            <input type="checkbox"
                className={cls.join(' ')}
                defaultChecked={checked}
                onClick={() => changeTheme(checked)}/>
            <div className={cls.join(' ')}></div>
            <div className={classes.layer}></div>
        </div>

        // <div className={classes.Checkbox}>
        //     <input type="checkbox"/>
        //     <div className={classes.knobs}></div>
        //     <div className={classes.layer}></div>
        // </div>
    )
}));

export default Checkbox;
import { inject, observer } from 'mobx-react';
import React, { ReactPropTypes, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './mainLayout.module.scss';
import Backdrop from '../../components/UI/BackDrop/Backdrop';
import MenuBurger from '../../components/UI/MenuBurer/MenuBurger';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import LayoutStore from 'Store/LayoutStore';


export type linkForRouter = string;
export interface ILink {
    to: linkForRouter;
    label: string;
    exact: boolean;
}
export const navLinks : Array<ILink> = [
    { to: '/', label: 'Counter', exact: true },
    { to: '/todos', label: 'тудухи', exact: false}
]

// type MainLayoutState = {
//     isOpen: boolean,
// }

const mainLayout = inject("LayoutStore")(observer((props: React.PropsWithChildren<{LayoutStore?: LayoutStore}>) => {


    const [isOpen, toggleOpen] = useState(false);


    const navToogleHandler = () => {
        // this.setState({isOpen: !this.state.isOpen});
        toggleOpen(!isOpen);
    }

    const renderLinks = () => {
        return navLinks.map((link: ILink, i: number) => {
            return (
                <li key={`navItemNumber_${i}`}>
                    <NavLink
                        to={link.to}
                    >
                        { link.label }
                    </NavLink>
                </li>
            )
        })
    }

    const renderOptions = () => {
        //https://codepen.io/himalayasingh/pen/EdVzNL
        return(
            <Checkbox />
        )
    }
    const renderMenuBurger = (isOpen: boolean) => {
        return(
            <MenuBurger isOpen={isOpen} onNavToggle={navToogleHandler}/>
            // <span>=</span>
        )
    }

    let navCls = isOpen? classes.isOpen : undefined;

    return (
        <React.Fragment>
            <div className={classes.MainLayout}>
                <header>
                    <div className={classes.logo}>
                        icon
                    </div>
                    <div className={classes["burger-menu"]}>
                        {renderMenuBurger(isOpen)}
                    </div>
                    <nav className={navCls}>
                        <ul>
                            {renderLinks()}
                        </ul>
                    </nav>                    
                    <div className={classes.profile}>
                        Hi, Alex 0-0
                    </div>
                    <div className={ classes.options }>
                        { renderOptions() }
                    </div>
                </header>

                <main className={ classes.main }>
                    {props.children}
                </main>
            </div>
            <Backdrop isOpen={isOpen} navToggleHandler={navToogleHandler}/>
        </React.Fragment>
    )
}));

export default mainLayout;

// export default class MainLayout extends React.Component<{LayoutStore?: LayoutStore}, MainLayoutState>{


//     constructor(props: {LayoutStore: LayoutStore}){
//         super(props);
//     }

//     NavToogleHandler(){
//         this.setState({isOpen: !this.state.isOpen});
//     }

//     renderLinks(){
//         return navLinks.map((link: ILink, i: number) => {
//             return (
//                 <li key={`navItemNumber_${i}`}>
//                     <NavLink
//                         to={link.to}
//                     >
//                         { link.label }
//                     </NavLink>
//                 </li>
//             )
//         })
//     }

//     renderOptions() {
//         //https://codepen.io/himalayasingh/pen/EdVzNL
//         return(
//             <Checkbox />
//         )
//     }
//     renderMenuBurger(isOpen: boolean){
//         return(
//             <MenuBurger isOpen={isOpen} onNavToggle={()=>this.NavToogleHandler()}/>
//             // <span>=</span>
//         )
//     }

//     componentDidMount(){
//         this.setState({isOpen: false});
//     }


//     render() {
//         const isOpen = this.state?.isOpen ?? false;
//         const navCls = isOpen? classes.isOpen : undefined;

//         return (
//             <React.Fragment>
//                 <div className={classes.MainLayout}>
//                     <header>
//                         <div className={classes.logo}>
//                             icon
//                         </div>
//                         <div className={classes["burger-menu"]}>
//                             {this.renderMenuBurger(isOpen)}
//                         </div>
//                         <nav className={navCls}>
//                             <ul>
//                                 {this.renderLinks()}
//                             </ul>
//                         </nav>                    
//                         <div className={classes.profile}>
//                             Hi, Alex 0-0
//                         </div>
//                         <div className={ classes.options }>
//                             { this.renderOptions() }
//                         </div>
//                     </header>

//                     <main className={ classes.main }>
//                         {this.props.children}
//                     </main>
//                 </div>
//                 <Backdrop isOpen={isOpen} navToggleHandler={()=>this.NavToogleHandler()}/>
//             </React.Fragment>
//         )
//     }
// }
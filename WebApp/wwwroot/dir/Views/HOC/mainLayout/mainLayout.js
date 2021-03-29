import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './mainLayout.module.scss';
import Backdrop from '../../components/UI/BackDrop/Backdrop';
import MenuBurger from '../../components/UI/MenuBurer/MenuBurger';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
export const navLinks = [
    { to: '/', label: 'Counter', exact: true },
    { to: '/todos', label: 'тудухи', exact: false }
];
// type MainLayoutState = {
//     isOpen: boolean,
// }
const mainLayout = inject("LayoutStore")(observer((props) => {
    const [isOpen, toggleOpen] = useState(false);
    const navToogleHandler = () => {
        // this.setState({isOpen: !this.state.isOpen});
        toggleOpen(!isOpen);
    };
    const renderLinks = () => {
        return navLinks.map((link, i) => {
            return (React.createElement("li", { key: `navItemNumber_${i}` },
                React.createElement(NavLink, { to: link.to }, link.label)));
        });
    };
    const renderOptions = () => {
        //https://codepen.io/himalayasingh/pen/EdVzNL
        return (React.createElement(Checkbox, null));
    };
    const renderMenuBurger = (isOpen) => {
        return (React.createElement(MenuBurger, { isOpen: isOpen, onNavToggle: navToogleHandler })
        // <span>=</span>
        );
    };
    let navCls = isOpen ? classes.isOpen : undefined;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.MainLayout },
            React.createElement("header", null,
                React.createElement("div", { className: classes.logo }, "icon"),
                React.createElement("div", { className: classes["burger-menu"] }, renderMenuBurger(isOpen)),
                React.createElement("nav", { className: navCls },
                    React.createElement("ul", null, renderLinks())),
                React.createElement("div", { className: classes.profile }, "Hi, Alex 0-0"),
                React.createElement("div", { className: classes.options }, renderOptions())),
            React.createElement("main", { className: classes.main }, props.children)),
        React.createElement(Backdrop, { isOpen: isOpen, navToggleHandler: navToogleHandler })));
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
//# sourceMappingURL=mainLayout.js.map
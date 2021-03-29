import React from 'react';
import Backdrop from '../BackDrop/Backdrop';
import classes from './Modal.module.scss';
const Modal = (props) => {
    const submitHandler1 = (ev) => {
        const input = document.querySelector(`.${classes.Txt}`);
        const value = input === null || input === void 0 ? void 0 : input.value.trimStart().trimEnd();
        let todo;
        if (value && input) {
            todo = { text: value, isComplited: false };
            props.submitHandler(todo);
            input.value = '';
        }
    };
    console.log(`render POPUP`);
    const cls = [
        classes.Modal
    ];
    if (props.isOpen) {
        cls.push(classes.isActive);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Backdrop, { isOpen: props.isOpen, navToggleHandler: props.closeHandler }),
        React.createElement("div", { className: cls.join(' ') },
            React.createElement("div", { className: classes.Header },
                React.createElement("span", null),
                React.createElement("span", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0434\u043E"),
                React.createElement("span", { onClick: props.closeHandler },
                    React.createElement("i", { className: "fa fa-times" }))),
            React.createElement("div", { className: classes.Content },
                React.createElement("input", { className: classes.Txt, type: "text", placeholder: '\u0447\u0442\u043E \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C?' }),
                React.createElement("i", { className: 'fas fa-check', onClick: (e) => submitHandler1(e) })))));
};
export default Modal;
//# sourceMappingURL=Modal.js.map
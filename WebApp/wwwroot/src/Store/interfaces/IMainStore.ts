import LayoutStore from "../LayoutStore";
import ModalStore from "../ModalStore";
import TodoStore from "../TodoStore";


export default interface IMainStore {
    readonly ModalStore: ModalStore,
    readonly LayoutStore: LayoutStore;
    readonly TodoStore: TodoStore;
}
import LayoutStore from "../LayoutStore";
import ModalStore from "../ModalStore";
import TodoStore from "../TodoStore";
import AutoStore from '../AutoStore';
import { History } from 'history/index';

export default interface IMainStore {
    readonly ModalStore: ModalStore;
    readonly LayoutStore: LayoutStore;
    readonly TodoStore: TodoStore;
    readonly AutoStore: AutoStore;
    readonly LocationInfo: History;
}

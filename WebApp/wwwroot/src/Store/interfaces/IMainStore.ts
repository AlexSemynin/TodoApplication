import LayoutStore from "../LayoutStore";
import ModalStore from "../ModalStore";
import TodoStore from "../TodoStore";
import IAutoStore from './IAutoStore';
import { History } from 'history/index';

export default interface IMainStore {
    readonly ModalStore: ModalStore;
    readonly LayoutStore: LayoutStore;
    readonly TodoStore: TodoStore;
    readonly AutoStore: IAutoStore;
    readonly LocationInfo: History;
}

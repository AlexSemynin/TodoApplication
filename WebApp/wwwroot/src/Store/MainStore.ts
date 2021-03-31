import LayoutStore from "./LayoutStore";
import ModalStore from "./ModalStore";
import TodoStore from "./TodoStore";
import AutoStore from "./AutoStore";
import IMainStore from "./interfaces/IMainStore";


export default class MainStore implements IMainStore{
    public readonly AutoStore: AutoStore;
    public readonly ModalStore: ModalStore;
    public readonly LayoutStore: LayoutStore;
    public readonly TodoStore: TodoStore;

    constructor() {
        this.ModalStore = new ModalStore(this);
        this.LayoutStore = new LayoutStore(this);
        this.TodoStore = new TodoStore(this);
        this.AutoStore = new AutoStore(this);
    }
}

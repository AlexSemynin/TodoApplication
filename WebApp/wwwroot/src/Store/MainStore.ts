import LayoutStore from "./LayoutStore";
import ModalStore from "./ModalStore";
import TodoStore from "./TodoStore";
import AutoStore from "./AutoStore";
import IMainStore from "./interfaces/IMainStore";
import { History } from 'history/index';
import {createBrowserHistory} from 'history';
import AphorismStore from "./AphorismStore";
import ErrorStore from "./ErrorStore";
import BaseService from "../Servises/BaseService";

export default class MainStore implements IMainStore{
    public readonly BaseSerice: BaseService; 
    public readonly AutoStore: AutoStore;
    public readonly ModalStore: ModalStore;
    public readonly LayoutStore: LayoutStore;
    public readonly TodoStore: TodoStore;
    public readonly LocationInfo: History;
    public readonly AphorismStore: AphorismStore;
    public readonly ErrorStore: ErrorStore

    constructor(baseService: BaseService) {
        this.BaseSerice = baseService;
        this.ModalStore = new ModalStore(this);
        this.LayoutStore = new LayoutStore(this);
        this.TodoStore = new TodoStore(this);
        this.AutoStore = new AutoStore(this);
        this.AphorismStore = new AphorismStore(this);
        this.ErrorStore = new ErrorStore(this);
        this.LocationInfo = createBrowserHistory();
    }
}

import dispatcher from '../Dispatcher.js'
import { EventEmitter } from "events";

const todos = [];

class TodoStore extends EventEmitter {
    constructor() {
        super()
        dispatcher.register((payload) => {
            switch (payload.type) {
                case 'CREATE_TODO':
                    todos.push(payload.todo);
                    break;
                case 'UPDATE_TODO':
                    todos[todos.indexOf(payload.todo)] = payload.todo;
                    break;
                case 'REMOVE_TODO':
                    delete todos[todos.indexOf(payload.todo)];
                    break
                default:
                    return;
            }
            this.emit('TODOSTORE_CHANGE');
        })
    }
    addChangeListener(callback) {
        this.on('TODOSTORE_CHANGE', callback)
    }
    removeChangeListener(callback) {
        this.removeListener('TODOSTORE_CHANGE', callback);
    }
    getTodos() {
        return todos;
    }
}

export default new TodoStore();
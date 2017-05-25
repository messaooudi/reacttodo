import dispatcher from '../Dispatcher.js'

class TodoActions{
    create(todo){
        dispatcher.dispatch({type : 'CREATE_TODO',todo : todo});
    }
    update(todo){
        dispatcher.dispatch({type : 'UPDATE_TODO',todo : todo});
    }
    remove(todo){
        dispatcher.dispatch({type : 'REMOVE_TODO',todo : todo});
    }
}
const todoAction = new TodoActions()
export default todoAction;
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TodoInput from '../TodoInput/TodoInput.js';
import TodoItem from '../TodoItem/TodoItem.js'
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import todoStore from '../../stores/TodoStore.js'
import todoAction from '../../actions/TodoActions.js'


class TodosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: todoStore.getTodos()
        }

        this.changeListener = this.changeListener.bind(this)
    }
    x
    render() {
        const style = {
            width: 500,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };

        const items = this.state.todos.sort((a, b) => { if (a.done) { return 1 } return -1 }).map((todo) => <div key={todo.id}><TodoItem key={todo.id} todo={todo} /><Divider /></div>)
        return (
            <Paper style={style} zDepth={2}>
                <TodoInput hintText="don't procrastinate"
                    floatingLabelText="What needs to be done"
                />
                <br />
                <RaisedButton onClick={()=>{this.state.todos.forEach((todo)=>{if(todo.done)todoAction.remove(todo)})}} label="Clear completed"/>
                <hr />
                {items}
            </Paper>
        );
    }

    componentDidMount() {
        todoStore.addChangeListener(this.changeListener);
    }
    componentWillUnmount() {
        todoStore.removeChangeListener(this.changeListener);
    }


    changeListener() {
        let todos = []
        Object.assign(todos, todoStore.getTodos());

        this.setState({ todos })
    }
}

export default TodosContainer;
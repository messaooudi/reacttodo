
import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import todoAction from '../../actions/TodoActions.js'


class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'item',
            value: this.props.todo.text
        }
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    render() {
        const style = { textAlign: "left" }
        style.backgroundColor = this.props.todo.done ? 'rgba(0,0,0,0.2)' : '';
        style.textDecoration =  this.props.todo.done ?'line-through':''
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={() => { this.props.todo.done = !this.props.todo.done; setTimeout(() => { todoAction.update(this.props.todo); }, 300) }}>{!this.props.todo.done ? 'done' : 'Still in progress'}</MenuItem>
                <MenuItem onClick={() => { todoAction.remove(this.props.todo) }}>Delete</MenuItem>
            </IconMenu>
        );

        return (
            this.state.mode === 'item' ?
                <ListItem children={(<div style={{
                    wordWrap:'break-word'
                }} key={this.props.todo.id}>{this.props.todo.text}</div>)} style={style} onDoubleClick={this.handleDoubleClick} onKeyPress={this.handleKeyPress} rightIconButton={rightIconMenu}
                /> :
                <ListItem >
                    <TextField
                        id={this.props.todo.id + ""}
                        autoFocus
                        fullWidth={true}
                        value={this.state.value}
                        onKeyPress={this.handleKeyPress} onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                </ListItem>
        )
    }

    handleBlur() {
        this.setState({ mode: 'item' })
        if (!this.state.value)
            this.setState({ value: this.props.todo.text })
    }
    handleDoubleClick() {
        if (!this.props.todo.done)
            this.setState({ mode: 'edite' })
    }

    handleChange({ target: { value } }) {
        this.setState({ value });
    }

    handleKeyPress(target) {
        if (target.charCode === 13 && !this.props.todo.done) {
            if (this.state.mode === 'item') {
                this.setState({ mode: 'edite' })
            } else {
                if (this.state.value.trim()) {
                    const todo = this.props.todo;
                    todo.text = this.state.value;
                    todoAction.update(todo);
                } else {
                    this.setState({ value: this.props.todo.text })
                }

                this.setState({ mode: "item" });
            }
        }
    }

}

export default TodoItem;
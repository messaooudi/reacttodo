import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import todoAction from '../../actions/TodoActions.js'

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        return (
            <TextField {...this.props} value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
        );
    }

    handleChange({ target: { value } }) {
        this.setState({ value });
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if(this.state.value.trim())
            todoAction.create({ id: (new Date()).getTime(), text: this.state.value });
            this.setState({ value: '' })
        }
    }
}

export default TodoInput;
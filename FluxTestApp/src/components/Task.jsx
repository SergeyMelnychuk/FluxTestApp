import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Task extends React.Component {
    constructor(props, context){
        super(props);
        this.state =  {
            isEditing: false
        };          
    }  

    handleEdit(e) {
        this.setState({ isEditing: true }, this.focusInput);
    }

    handleCancel() {
        this.cancelTask();
    }

    handleSave() {
        this.saveTask();
    }

    handleCheck() {            
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    }

    focusInput() {
        this.input.focus();
    }

    saveTask() {       
        this.props.onUpdate({ text: this.input.value });

        this.setState({ isEditing: false });
    }

    cancelTask() {
        this.setState({ isEditing: false });
    }

    render() {
        return (
            this.state.isEditing
            ?
                <div className='Task editing'>
                    <input
                        className='Task__input'
                        type='text'
                        defaultValue={this.props.text}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        ref={c => this.input = c}
                    />
                    <div className='Task__toolbar'>
                        <div>
                            <RaisedButton primary onClick={this.handleSave.bind(this)} label='Save' />
                            <FlatButton onClick={this.handleCancel.bind(this)} label='Cancel' />
                        </div>
                    </div>
                </div>
            :
                <div className='Task'>
                    <Checkbox
                        className='Task__checkbox'
                        checked={this.props.isCompleted}
                        onCheck={this.handleCheck.bind(this)}
                    />

                    <div className='Task__text' onClick={this.handleEdit.bind(this)}>
                        <div className='Task__title'>{this.props.text}</div>
                    </div>

                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                        <MenuItem onClick={this.handleEdit.bind(this)}>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                    </IconMenu>
                </div>
        );
    }
}

export default Task;

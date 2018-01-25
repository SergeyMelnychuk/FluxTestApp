import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskListCreateModal extends React.Component {
    constructor(props, context){
        super(props);
        this.state = {
            name : ''
        };
      }     
    
    handleClose() {
        const { onClose } = this.props;

        this.setState({ name: '' });

        if (onClose) {
            onClose();
        }
    }

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                name: this.state.name
            });
        }

        this.setState({ name: '' });
    }

    handleTextChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {        
        const { name } = this.state;        
        const { isOpen } = this.props;

        return (
            <Dialog
                className='TaskListCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleClose.bind(this)}
                    />,
                    <FlatButton
                        primary
                        label='Submit'
                        disabled={!name}
                        onTouchTap={this.handleSubmit.bind(this)}
                    />
                ]}
                open={isOpen}
                onRequestClose={this.handleClose.bind(this)}
            >
                <h3 className='TaskListCreateModal__modal-title'>Add task list</h3>
                <TextField
                    fullWidth
                    ref={c => this.taskInput = c}
                    value={name}
                    onChange={this.handleTextChange.bind(this)}
                    hintText='e.g. movies to watch'
                    floatingLabelText='Enter task list name'
                />
            </Dialog>
        );
    }
}

export default TaskListCreateModal;

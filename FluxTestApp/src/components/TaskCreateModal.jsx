import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class TaskCreateModal extends React.Component {
    constructor(props, context){        
        super(props);
        this.state = {
            text : ''
        };
    }    

    handleClose() {
        const { onClose } = this.props;

        this.setState({ text: '' });

        if (onClose) {
            onClose();
        }
    }  

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
            onSubmit({
                text: this.state.text
            });
        }

        this.setState({ text: '' });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {         
        const { text } = this.state;       
        const { isOpen } = this.props;

        return (
            <Dialog
                className='TaskCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleClose.bind(this)}
                    />,
                    <FlatButton
                        primary
                        label='Submit'
                        disabled={!text}
                        onTouchTap={this.handleSubmit.bind(this)}
                    />
                ]}
                open={isOpen}
                onRequestClose={this.handleClose.bind(this)}
            >
                <h3 className='TaskCreateModal__modal-title'>Add task</h3>
                <TextField
                    fullWidth
                    ref={c => this.taskInput = c}
                    value={text}
                    onChange={this.handleTextChange.bind(this)}
                    hintText='e.g. buy a bottle of milk'
                    floatingLabelText='Enter task description'
                />
            </Dialog>
        );
    }
}

export default TaskCreateModal;

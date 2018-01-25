import React from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';

import TaskListCreateModal from '../components/TaskListCreateModal.jsx';
import TasklistsPage from '../components/TasklistsPage.jsx';

function getStateFromFlux() {    
    return {
        taskLists: TaskListsStore.getTaskLists()
    };
}

class TasklistsPageContainer extends React.Component{
    constructor(props, context){        
        super(props);
        context.router;
        this.state =  Object.assign({isCreatingTaskList: false}, getStateFromFlux());                             
    }  
            
    componentWillMount() {
        TaskListsActions.loadTaskLists();
    }

    componentDidMount() {
        TaskListsStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        TaskListsStore.removeChangeListener(this._onChange.bind(this));
    }

    handleAddTaskList() {        
        this.setState({ isCreatingTaskList : true });
    }

    handleClose() {
        this.setState({ isCreatingTaskList : false });
    }

    handleTaskListSubmit(taskList) {
        TaskListsActions.createTaskList(taskList);

        this.setState({ isCreatingTaskList : false });
    }

    render() {
        return (
            <div>
                <TasklistsPage
                    taskLists={this.state.taskLists}
                    selectedListId={this.props.params.id}
                    page={this.props.children}
                    onAddTaskList={this.handleAddTaskList.bind(this)}
                    onLogOut={this.onLogOut.bind(this)}
                />

                <TaskListCreateModal
                    isOpen={this.state.isCreatingTaskList}
                    onSubmit={this.handleTaskListSubmit.bind(this)}
                    onClose={this.handleTaskListCreateModalClose.bind(this)}
                />
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
};
TasklistsPageContainer.contextTypes = {    
    router: PropTypes.object.isRequired
};
export default TasklistsPageContainer;
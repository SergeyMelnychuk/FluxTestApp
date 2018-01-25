import React from 'react';

import TasksActions from '../actions/TasksActions';
import TaskListsActions from '../actions/TaskListsActions';
import TasksStore from '../stores/TasksStore';
import TaskListsStore from '../stores/TaskListsStore';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks()
    };
}
class TasksPageContainer extends React.Component {
    constructor(props, context){
        super(props);
        context.router;
        this.state =  Object.assign({isCreatingTask: false}, getStateFromFlux());          
    }   

    componentWillMount() {
        TasksActions.loadTasks(this.props.match.params.id);
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillReceiveProps(nextProps) {        
        if (this.props.match.params.id !== nextProps.match.params.id) {
            TasksActions.loadTasks(nextProps.match.params.id);
        }
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange.bind(this));
    }

    handleStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.match.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    }

    handleTaskUpdate(taskId, { text }) {       
        TasksActions.updateTask({
            taskListId: this.props.match.params.id,
            taskId: taskId,
            text: text
        });
    }

    handleAddTask() {        
        this.setState({ isCreatingTask : true });
    }

    handleTaskCreateModalClose() {
        this.setState({ isCreatingTask : false });
    }

    handleTaskSubmit(task) {
        const taskListId = this.props.match.params.id;

        TasksActions.createTask( Object.assign({taskListId}, task));        

        this.setState({ isCreatingTask : false });
    }

    handleDeleteTaskList() {
        const isConfirmed = confirm(
            'Are you sure you want delete this task list? All tasks in it will be deleted too'
        );

        if (isConfirmed) {
            TaskListsActions.deleteTaskList({
                taskListId: this.props.match.params.id
            });
        }

        this.context.router.push('/lists');
    }

    handleUpdateTaskList({ name }) {
        TaskListsActions.updateTaskList({
            taskListId: this.props.match.params.id,
            name
        });
    }

    render() {
        return (
            <div>
                <TasksPage
                    taskList={this.state.taskList}
                    tasks={this.state.tasks}
                    error={this.state.error}
                    isLoadingTasks={this.state.isLoadingTasks}
                    onUpdateTaskList={this.handleUpdateTaskList.bind(this)}
                    onAddTask={this.handleAddTask.bind(this)}
                    onDeleteTaskList={this.handleDeleteTaskList.bind(this)}
                    onTaskDelete={this.handleTaskDelete.bind(this)}
                    onTaskStatusChange={this.handleTaskStatusChange.bind(this)}
                    onTaskUpdate={this.handleTaskUpdate.bind(this)}
                />
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit.bind(this)}
                    onClose={this.handleTaskCreateModalClose.bind(this)}
                />
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

TasksPageContainer.contextTypes = {    
    router: PropTypes.object.isRequired
};

export default TasksPageContainer;
import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';
import TaskListCreateModal from './TaskListCreateModal.jsx';
import TasksPage from '../containers/TasksPage.jsx';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';

import './TasklistsPage.less';

class TasklistsPage extends React.Component{
    render() {
        const { router } = this.context;
        return (
            <div className='TasklistsPage'>
                <div className='TasklistsPage__menu'>
                    <List className='TasklistsPage__list'>
                        <h3 className='TasklistsPage__title'>Almost Google Tasks</h3>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<HomeIcon />}
                                primaryText="Home"
                                onClick={router.history.push.bind(null, `/lists`)}
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={router.history.push.bind(null, `/about`)}
                            />
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list' subheader="Task Lists">                                
                            {
                                this.props.taskLists.map(list =>
                                    <ListItem
                                        key={list.id}
                                        leftIcon={<FolderIcon />}
                                        primaryText={list.name}
                                        onClick={router.history.push.bind(null, `/lists/${list.id}`)}
                                    />
                                )
                            }
                            <ListItem
                                leftIcon={<AddIcon />}
                                primaryText="Create new list"
                                onClick={this.props.onAddTaskList}
                            />
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list'>
                            <ListItem
                                leftIcon={<ExitIcon />}
                                primaryText="Log out"
                                onClick={this.props.onLogOut}
                            />
                        </List>
                    </List>
                </div>
                <div className='TasklistsPage__tasks'>
                    <Route path='/lists/:id' component={TasksPage} />
                </div>                               
            </div>
        );
    }  
}
TasklistsPage.contextTypes = {    
    router: PropTypes.object.isRequired
};
export default TasklistsPage;

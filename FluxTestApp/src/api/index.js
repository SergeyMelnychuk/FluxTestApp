import React from 'react';
const CLIENT_ID = '21239358940-p88540a2de1mg3h0ulgkf32l491vb2c2.apps.googleusercontent.com';
const API_KEY = 'D4hvT5NnGAXtn9dunkWbSnvp';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];
//var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"];

export default {
    authorize(params) {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize(
                {
                    'apiKey': API_KEY,
                    'client_id': CLIENT_ID,                  
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authResult => {                       
                    console.log(authResult);                                     
                    if (authResult.error) {
                        return reject(authResult.error);
                    }

                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
                }
            );
        });
    },

    listTaskLists() {
        const request = gapi.client.tasks.tasklists.list();

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    insertTaskList({ title }) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    listTasks(taskListId) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    insertTask({ taskListId, title }) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist : taskListId,
            title    : title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    updateTaskStatus({ taskListId, taskId, status }) {        
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            status   : status
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    updateTask({ taskListId, taskId, title }) {        
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            title   : title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    }
}

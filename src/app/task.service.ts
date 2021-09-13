import { Injectable } from '@angular/core';
import {ApiConfService} from "./api-conf.service";
import TaskModel from "./Models/taskModel";
import {Observable} from "rxjs";
import TaskListModel from "./Models/taskListModel";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfService ) { }
  // to fetch all taskLists
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists');
  }
   // create a taskList bucket
  createTaskList(title:string):Observable<TaskListModel>{
let data = { 'title' : title};
return this.apiConfigService.post('tasklists', data)
  }
  // get all tasks of a taskList object
  //http://localhost:3000/tasklists/6135fca0107d027519598995/tasks
  getAllTasksOfATaskList(taskListId: string){
return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`)
  }

  // create a task inside a taskList object
  //http://localhost:3000/tasklists/6135fca0107d027519598995/tasks
  createTaskInTaskList(taskListId: string , title: string){

    return this.apiConfigService.post(`tasklists/${taskListId}/tasks` , {title} );
  }

  //delete a taskList
  //http://localhost:3000/tasklists/6135fca0107d027519598995
  deleteATaskList(taskListId: string):Observable<TaskListModel>{

    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  //delete a task
  //http://localhost:3000/tasklists/6135fca0107d027519598995/tasks/idTask
  deleteATaskInATaskList(taskListId: string , taskId: string ):Observable<TaskModel>{

    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }


  //update the status of a task whether is completed or not
   updateTaskStatus(taskListId: string , taskObject:TaskModel):Observable<TaskModel>{
    let updateData ={ 'completed': !taskObject.completed}; // toggle the database value
     return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}` , updateData);

   }

}


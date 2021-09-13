import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import TaskListModel from "./Models/taskListModel";
import TaskModel from "./Models/taskModel";

@Injectable({
  providedIn: 'root'
})
export class ApiConfService {
API_BASE_URL='http://localhost:3000';
  constructor(private  httpClient : HttpClient) { }

  // API Call to Backend
  getTaskLists(url : String){
    return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`); //http://localhost:3000/tasklists
  }
  getTasks(url : String){
    return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`); //http://localhost:3000/tasklists/taskListId/tasks
  }
  post(url : String , data:Object){
    return this.httpClient.post<TaskListModel>(`${this.API_BASE_URL}/${url}` , data);//http://localhost:3000/tasklists
  }
  put(url : String , data:Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}` , data);
  }
  patch(url : String , data:Object){
    return this.httpClient.patch<TaskModel>(`${this.API_BASE_URL}/${url}` , data);
  }
  deleteTask(url : String){
    return this.httpClient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
  }
  deleteTaskList(url : String){
    return this.httpClient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }
}

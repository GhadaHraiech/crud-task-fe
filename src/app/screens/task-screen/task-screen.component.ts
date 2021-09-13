import { Component, OnInit } from '@angular/core';
import TaskListModel from "../../Models/taskListModel";
import TaskModel from "../../Models/taskModel";
import {TaskService} from "../../task.service";
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {
 taskLists: TaskListModel[] = [];
 tasks: TaskModel[] = [];
  taskListId: string='';
  constructor(private taskService : TaskService ,
              private activatedRoute: ActivatedRoute ,
              private router: Router) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists()
      .subscribe( allTaskList=>{
        this.taskLists= allTaskList
        //get the first taskList Id and route to it on page load
       // this.router.navigate(['task-list', this.taskLists[0]['_id']]);
      });

        this.activatedRoute.params.subscribe(
      (params: Params)=> {
       this.taskListId= params.taskListId;
        if(this.taskListId){
          this.taskService.getAllTasksOfATaskList(this.taskListId).subscribe(
            (tasks:TaskModel[])=> this.tasks=tasks
          );
        }
      }
    );
  }
  taskClicked(task : TaskModel){
    console.log(task);
    this.taskService.updateTaskStatus(this.taskListId , task)
      .subscribe(()=>task.completed=!task.completed);

  }
  deleteTask(task : TaskModel){
    console.log(task);
    this.taskService.deleteATaskInATaskList(this.taskListId , task._id)
      .subscribe((taskdeleted: TaskModel ) => {
       this.tasks= this.tasks.filter(t => t._id != taskdeleted._id) ;//remove the deleted task from that class level tasks
      });
  }
  deleteTaskList(taskList : TaskListModel){
    console.log(taskList);
    this.taskService.deleteATaskList(taskList._id)
      .subscribe(() => {
        this.taskLists= this.taskLists.filter(t => t._id != taskList._id) ;//remove the deleted task from that class level tasks
      });
  }
  addNewTask(){
    if(this.taskListId){
// route the user to add a task screen for the selected taskList
      this.router.navigate(['new-task'], {relativeTo:this.activatedRoute})
    } else {
      alert("please select a tasklist! ");
      return;
    }
  }
}

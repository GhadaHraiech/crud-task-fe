import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {
taskListId: string = '';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private taskService: TaskService) {
    this.activatedRoute.params.subscribe(
      (params:Params) =>{
        this.taskListId= params.taskListId;
      }
    );
  }

  ngOnInit(): void {
  }
  addNewTask(title: string) {
this.taskService.createTaskInTaskList(this.taskListId , title).subscribe(
  ()=>{
    this.router.navigate(['../'] ,{relativeTo: this.activatedRoute}  )
  }
);
  }
}

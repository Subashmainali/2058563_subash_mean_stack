import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ITask} from "../../task.model";
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  //taskList ?: Observable<ITask[]>;

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    //this.taskList = this.taskService.taskObservable;
  }

  //task ?: ITask ;
  //@Output() messageEvent = new EventEmitter<ITask>();



  taskRef = new FormGroup({
    id: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    task:  new FormControl("", [Validators.required]),
    deadline:  new FormControl("", [Validators.required])
  });


  addTask():void{
    let task:ITask = this.taskRef.value;
    console.log(task);
    this.taskRef.reset();
    this.taskService.addTask(task);

    //this.messageEvent.emit(this.task);
  }

}



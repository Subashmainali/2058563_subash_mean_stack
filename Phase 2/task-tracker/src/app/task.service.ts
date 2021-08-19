import { Injectable } from '@angular/core';
import { ITask} from "../task.model";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _task= new BehaviorSubject<ITask[]>([]);
  readonly taskObservable = this._task.asObservable();

  private taskList : ITask[] = [];

  constructor() {
    this._task.next(this.taskList);
  }
  
  addTask(task:ITask){
    this.taskList.push(task);
    this._task.next(Object.assign([], this.taskList));
  }

}




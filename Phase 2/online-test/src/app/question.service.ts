import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IQuestion } from 'src/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  checkData():Observable<IQuestion[]>{
    return this.http.get<IQuestion[]>('./assets/test.json')
  }
}

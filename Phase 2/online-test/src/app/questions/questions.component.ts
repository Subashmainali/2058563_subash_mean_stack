import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../question.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questionList: IQuestion[] = [];

  quizRef: FormGroup;
  constructor(public form: FormBuilder, public questionService: QuestionService) {    // build form dynamically creating DI
    this.quizRef = form.group({});
  }

  ngOnInit(): void {
    this.questionService.checkData().subscribe(
      d => {
        for(let e of d){
          this.questionList.push(e);
          this.quizRef.addControl(e.questionId, this.form.control(""));
        } 
      }
    )
    console.log("==============================================");
    console.log(this.questionList);
    
  }
  

  f:boolean = false;
  choiceList: any ;
  totalQuestion:number=0;
  correctAnswer:number=0
  pass:boolean = false;
  displayResult(): void {
    //console.log(this.quizRef);
    this.choiceList = this.quizRef.value

    this.totalQuestion = this.questionList.length;
    this.questionList.forEach(element => {
      console.log(element.questionId)
     
      console.log( this.choiceList[element.questionId]);
      if(this.choiceList[element.questionId] === element.ans.ans){
        this.correctAnswer += 1;
      } 
      
    });
    
    //console.log(this.choiceList);
    this.f = true;
    if(this.correctAnswer>6) {
      this.pass=true;
    }
   
  }

  goBack(){
    this.f = false;
    this.correctAnswer=0
    
  }

  // questionList:IQuestion[] = [
  //                 {questionId:"123", question:"what is the answer?",
  //                 ans: {ans:'correct answer',opt1:'opt1a',opt2:'opt2a',opt3:'opt3a',opt4:'opt4a'}},

  //                 {questionId:"234", question:"what is the answer 2?",
  //                 ans: {ans:'correct answer',opt1:'opt2b',opt2:'opt3b',opt3:'opt4b',opt4:'opt5b'}}

  // ];


}

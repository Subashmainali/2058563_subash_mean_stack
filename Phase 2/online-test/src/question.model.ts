import {IAnswer} from './answer.model';

export interface IQuestion {
    questionId:string;
    question:string;
    ans: IAnswer
}
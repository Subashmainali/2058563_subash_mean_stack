import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { IUser, IContact} from '../user.model'
//import { serialize } from 'v8';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'amazing-portfolio';

  // only display login page on initlization
  canDisplayLogin: boolean = true;
  canDisplaySignUp: boolean = false;
  canDisplayPortfolio:boolean = false;
  canDisplayTable:boolean = false;

  userName: string ="";
  password: string ="";
  fname?: string;
  lname?: string;

  msg:string="";


  // form validation
  loginRef = new FormGroup({ 
    user:    new FormControl("",[Validators.required]),
    pass:    new FormControl("",[Validators.required])
  });

  regRef = new FormGroup({
    fname: new FormControl("",[Validators.required]),
    lname: new FormControl("",[Validators.required]),
    user:  new FormControl("", [Validators.required]),
    pass:  new FormControl("", [Validators.required])
  });

  contactRef = new FormGroup({ 
    name:    new FormControl("",[Validators.required]),
    number:    new FormControl("",[Validators.required])
  });


  // contact array
  contactList : IContact[] = [];


  switchToLogin(){
    this.canDisplayLogin = true;
    this.canDisplaySignUp = false;
    this.canDisplayPortfolio = false;

  }

  switchToSignUp(){
    this.canDisplayLogin = false;
    this.canDisplaySignUp = true;
    this.canDisplayPortfolio = false;

  }

  switchToPortfolio(){
    this.canDisplayLogin = false;
    this.canDisplaySignUp = false;
    this.canDisplayPortfolio = true;


  }


  switchDisplay(display: string) :void{
    if(display === "login"){
      this.switchToLogin();
    }

    if(display === "signUp"){
      this.switchToSignUp();
    }

    if(display === "portfolio"){
      this.switchToPortfolio();
    }

  }


  validateUser() :void{
    let login = this.loginRef.value;
    console.log(login.user);
    console.log(login.pass)
    
    if(login.user === this.userName && login.pass === this.password ){
      this.switchDisplay('portfolio');
    }else{
      this.msg = "Invalid  username or password";
    }
  

  }

  registerUser() :void{
    let newUser:IUser = this.regRef.value;
    //{fname, lname, user, pass} = newUser;
    this.fname = newUser.fname;
    this.lname = newUser.lname;
    this.userName = newUser.user;
    this.password = newUser.pass;
    this.regRef.reset();
    this.switchDisplay('login');

  }

  saveContact() :void{
    let newContact: IContact = this.contactRef.value;
    
    this.contactList.push(newContact);
    this.contactRef.reset();
    console.log(this.contactList);

  }
  
  showTable(){
    this.canDisplayTable = true;
  }




}

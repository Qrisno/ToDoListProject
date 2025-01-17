import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Router} from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedState = true;
  database: any;
  validStatus = true;
  data: any;
  login(i: any): void{
    this.getUserList().on('value', (snapshot: any) => {
      this.data = snapshot.val();
      for (const userId in Object.keys(this.data)){
        if (this.data.hasOwnProperty(userId)){
          if (this.data[userId].username === i.username && this.data[userId].password === i.password){
            this.router.navigate(['dashboard']);
            localStorage.setItem('userId', userId);
            this.loggedState = true;
          }else{
            this.loggedState = false;
          }
          this.validStatus = this.loggedState;
        }
        }
    });

  }
  logOut(): void{
    this.router.navigate(['auth']);
    localStorage.removeItem('userId');

  }
  constructor(public router: Router) {
    firebase.initializeApp({apiKey: 'AIzaSyBQEcLynOTrxHyXR4Z4Q_wpR2g9EPGLqIA',
    authDomain: 'todolist-3ad68.firebaseapp.com',
    projectId: 'todolist-3ad68',
    storageBucket: 'todolist-3ad68.appspot.com',
    messagingSenderId: '487526463755',
    appId: '1:487526463755:web:a67ccfb3d10e4fc3c74a0e',
    measurementId: 'G-M9EQGFVTNN'});
    this.database = firebase.database();
   }
  getUserList(): any{
    return this.database.ref('usersList');
  }
  getUserId(): string | null{
    return localStorage.getItem('userId');
  }
}

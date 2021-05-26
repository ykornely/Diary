import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Paragraph } from './paragraph.model';

@Injectable({
  providedIn: 'root'
})

// this is injected in sign-up.component.ts. used in the constructor
export class UserAndParagraphService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  //paragraphs: Paragraph[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // http methods

  postUser(user: User) {
    return this.http.post("http://localhost:3000/api" + '/register' , user, this.noAuthHeader); // reach for the user.controller.js on server side, which is responsible for adding new user to the database. The used link is in environment.ts
  } //"http://localhost:3000/api" instead of 'environment.apiBaseUrl'

  login(authCredentials) { // with this function we make a login request into /authenticate URI into our node.js API and we'll send userCredentials (email and password). In return to this request we expect a JWT token. This function is used in sign-in.component.ts's onSubmit.
    return this.http.post("http://localhost:3000/api" + '/authenticate', authCredentials, this.noAuthHeader); // "http://localhost:3000/api" instead of 'environment.apiBaseUrl'
  }

  getUserProfile() {
    return this.http.get("http://localhost:3000/api" + '/userProfile');
  } //"http://localhost:3000/api" instead of 'environment.apiBaseUrl'



  getParagraphs() {
    return this.http.get("http://localhost:3000/api" + '/diary');
  }

  postParagraph(paragraph: Paragraph) {
    return this.http.post("http://localhost:3000/api" + '/diary', paragraph);
  }

  patchParagraph(paragraph: Paragraph) {
    return this.http.patch("http://localhost:3000/api" + '/diary/' + paragraph._id, paragraph);
  }

  deleteParagraph(_id: string) {
    return this.http.delete("http://localhost:3000/api" + '/diary/' + _id);
  }

  // helper methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]); // splits the token and store the second part (payload) in userPayload
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000; // gives back if user experation time is over or not
    }
    else {
      return false;
    }
  }
}
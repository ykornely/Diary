import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAndParagraphService } from '../shared/user-and-paragraph.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userDetails;
  constructor(private userService: UserAndParagraphService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  ngOnDestroy() {
    
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
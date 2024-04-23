import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn = false;
  // currentUser$ : Observable<User | null> = of(null);

  constructor(public _accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.currentUser$ = this._accountService.currentUser$;
  }

  // getCurrentUser(){
  //   this._accountService.currentUser$.subscribe({
  //     next:user => this.loggedIn = !!user,
  //     error:error =>console.log(error)
  //   })
  // }
  login() {
    this._accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        //  this.loggedIn = true;
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error)
    })
  }

  logOut() {
    // this.loggedIn = false;
    this._accountService.logout();
    this.router.navigateByUrl('/');
    // localStorage.clear();
  }
}

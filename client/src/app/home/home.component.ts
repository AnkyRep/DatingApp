import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registorMode = false;
  users:any;
  constructor(private _accountService : AccountService) { }

  ngOnInit(): void {
    this.dotnetApiCalling();
  }

  registerToggle(){
    this.registorMode = !this.registorMode;
  }

  dotnetApiCalling() {
    this._accountService.dotnetAPICalling().subscribe((data) => {
      this.users = data
    })
  };

  cancelRegistration(event:boolean){
    this.registorMode = event;
  }


}

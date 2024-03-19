import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title1: string = 'DOTNET ';
  title2: string = 'NODE JS API DATA';

  users: any;
  nodeDataCalling: any;
  weatherData: any;
  idEnterd: string = '' ;
  getCourses: any;


  constructor(private _accountService: AccountService) {

  }
  ngOnInit(): void {
    this.dotnetApiCalling()
   // this.nodeApiCalling();
    this.weatherAPI();
  }

  dotnetApiCalling() {
    this._accountService.dotnetAPICalling().subscribe((data) => {
      this.users = data
    })
  };

  nodeApiCalling() {
    this._accountService.nodeAPICalling().subscribe(
      (data) => {
        this.nodeDataCalling = data
      }
    )
  };

  weatherAPI() {
    this._accountService.dotnetAPIWeather().subscribe((data) => {
      this.weatherData = data
    })
  };

  update(value:string){
    console.log("ENTER VAL",value,this.idEnterd)
    this._accountService.getpdateID(this.idEnterd).subscribe(
      (data) => {
        this.getCourses = data
      }
    )
  }

}

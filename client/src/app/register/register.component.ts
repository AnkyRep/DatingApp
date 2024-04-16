import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Input() userFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  constructor(private _accountService : AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this._accountService.register(this.model).subscribe({
      next: () => {
        //We are not using the response so we can just declare empty bracket 
       // console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }

}

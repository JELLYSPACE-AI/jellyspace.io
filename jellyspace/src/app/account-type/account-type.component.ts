import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent implements OnInit {

  isValue: number = 0;

  toggle(num: number) { this.isValue = num; }

  constructor() { }

  ngOnInit(): void {
  }

}

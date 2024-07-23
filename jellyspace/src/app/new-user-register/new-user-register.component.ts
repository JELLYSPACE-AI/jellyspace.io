import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css'],
})
export class NewUserRegisterComponent implements OnInit {
  constructor(private router: Router) {}

  onRadioValue: any;
  radiocheck: boolean = false;
  isFreelance: boolean = false;
  isCompany: boolean = false;
  isBigCompany: boolean = false;

  ngOnInit(): void {
    var b = localStorage.getItem('newuser');
    switch (b) {
      case 'freelancer':
        this.isFreelance = true;
        this.radiocheck = true;
        break;
      case 'organization':
        this.isBigCompany = true;
        this.radiocheck = true;
        break;
      case 'company':
        this.isCompany = true;
        this.radiocheck = true;
        break;
      default:
        break;
    }
  }

  onChnageValue(val: any, eve: any) {
    this.radiocheck = eve.target.checked;
    this.onRadioValue = val;
    localStorage.setItem('accountType', val);
  }

  startFreeTrial() {
    // Navigate to the next step for the free trial
    this.router.navigate(['next-step-free-trial']);
  }

  completeRegistration() {
    // Navigate to the next step for complete registration
    this.router.navigate(['next-step-complete-registration']);
  }
}

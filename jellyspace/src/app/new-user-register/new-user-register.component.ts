import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css'],
})
export class NewUserRegisterComponent implements OnInit {
  companyName: any;
  public street: any;
  public hNumber: any;
  public city: any;
  public postalCode: any;
  public country: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('params ', params['q']);
      if (!this.companyName) {
        this.companyName = params['q'];
      }
    });
  }
  // (click)="previousRoute()" routerLink="/"
  // (click)="nextRoute()" routerLink="/account-handler"
  nextRoute() {
    let params = { q: this.companyName };
    localStorage.setItem('street', this.street);
    localStorage.setItem('housenumber', this.hNumber);
    localStorage.setItem('city', this.city);
    localStorage.setItem('postalcode', this.postalCode);
    localStorage.setItem('country', this.country);
    this.router.navigate(['account-handler'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }
  previousRoute() {
    let params = { q: this.companyName };
    this.router.navigate(['register-identification'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }
}

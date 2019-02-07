import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signin() {
    this.authService.signin(this.userName, this.password)
      .subscribe(
        _ => {
          let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl ? returnUrl : '']);
        },
        err => alert('Bad credentials')
      );
  }
}

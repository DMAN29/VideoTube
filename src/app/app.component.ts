import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'video-tube';

  constructor(private oidcSecurityService: OidcSecurityService){

  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(isAuthenticated=>{
        console.log('app is authenticated',isAuthenticated)
      });
  }
}

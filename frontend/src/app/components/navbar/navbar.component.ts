import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router){}

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logOut(): void {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }
}

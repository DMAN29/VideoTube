import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VideoService } from '../../video.service';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.videoService.login(this.email.value, this.password.value).subscribe((data) => {
      if (data.status === 200) {
        this.authService.login(data.token);
        this.router.navigate(['/upload-video']); 
      }
    });
  }
}

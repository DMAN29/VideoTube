import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoService } from '../../video.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),  
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private videoService:VideoService){}
  signup(){
    this.videoService.signup(this.userForm).subscribe(data=> console.log(data));
  }
}

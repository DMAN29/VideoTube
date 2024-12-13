import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';
import { FormGroup } from '@angular/forms';
import { LoginResponse } from './auth/login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(
    private httpsClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // private getHeader() {
  //   let headers = new HttpHeaders();
  //   if (isPlatformBrowser(this.platformId)) {
  //     const token = localStorage.getItem('token');
  //     console.log("Token from localStorage:", token);  // Log token
  
  //     if (token) {
  //       headers = headers.set('Authorization', `Bearer ${token}`);
  //     } else {
  //       console.error('No token found in localStorage');
  //     }
  //   }
  //   console.log("Headers being returned:", headers);  // Log headers being returned
  //   return headers;
  // }
  

  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    return this.httpsClient.post<LoginResponse>("http://localhost:8080/login", loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  signup(userData: FormGroup) {
    const signupData = userData.value;
    return this.httpsClient.post("http://localhost:8080/register", signupData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    // let token =''
    // if (isPlatformBrowser(this.platformId)) {
      // token = localStorage.getItem('token') || '';  // Get token from localStorage (if available)
    // }
    return this.httpsClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData,
    //  {
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // }
    // }
  );
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);
    return this.httpsClient.post("http://localhost:8080/api/videos/thumbnail", formData, { responseType: 'text' });
  }

  getVideo(videoId: string): Observable<VideoDto> {
    // const token = localStorage.getItem('token') || ''; // Ensure token is retrieved
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.httpsClient.get<VideoDto>(`http://localhost:8080/api/videos/${videoId}`);
  }
  

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.httpsClient.put<VideoDto>("http://localhost:8080/api/videos", videoMetaData);
  }
}

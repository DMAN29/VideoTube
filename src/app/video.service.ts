import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpsClient: HttpClient) { }

  uploadVideo(fileEntry: File):Observable<any>{
    const formData = new FormData();
    formData.append('file',fileEntry,fileEntry.name);

    return this.httpsClient.post("http://localhost:8080/api/videos",formData);

  }
}
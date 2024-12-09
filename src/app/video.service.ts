import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
 

  constructor(private httpsClient: HttpClient) { }

  uploadVideo(fileEntry: File):Observable<UploadVideoResponse>{
    const formData = new FormData();
    formData.append('file',fileEntry,fileEntry.name);

    return this.httpsClient.post<UploadVideoResponse>("http://localhost:8080/api/videos",formData);

  }

  uploadThumbnail(fileEntry: File,videoId: string):Observable<string>{
    const formData = new FormData();
    formData.append('file',fileEntry,fileEntry.name);
    formData.append('videoId',videoId);

    return this.httpsClient.post("http://localhost:8080/api/videos/thumbnail",formData,{responseType:'text'});

  }

  getVideo(videoId: string): Observable<VideoDto>{
    return this.httpsClient.get<VideoDto>("http://localhost:8080/api/videos/"+videoId);

  }

  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.httpsClient.put<VideoDto>("http://localhost:8080/api/videos",videoMetaData)
  }
}

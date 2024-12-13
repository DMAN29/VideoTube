import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
})
export class SaveVideoDetailsComponent {
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;
  userEmail!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private matSnackBar: MatSnackBar
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });

    this.fetchVideoData();
  }

  fetchVideoData() {
    this.videoService.getVideo(this.videoId).subscribe({
      next: (data: VideoDto) => {
        console.log('data', data);
        this.videoUrl = data.videoUrl;
        this.thumbnailUrl = data.thumbnailUrl;
        this.userEmail = data.userEmail;
      },
      error: (err) => {
        console.error('Error fetching video data:', err);
      },
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.fileSelected = true;
    }
  }

  onUpload() {
    this.videoService
      .uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(() => {
        this.matSnackBar.open('Thumbnail Upload Successful', 'OK');
      });
  }

  saveVideo() {
    const videoMetaData: VideoDto = {
      id: this.videoId,
      title: this.title.value,
      description: this.description.value,
      tags: this.tags,
      videoStatus: this.videoStatus.value,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      userEmail: this.userEmail,
    };

    this.videoService.saveVideo(videoMetaData).subscribe(() => {
      this.matSnackBar.open('Video Metadata Updated Successfully', 'OK');
    });
  }
}

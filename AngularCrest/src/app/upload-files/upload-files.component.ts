import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoServiceService } from '../todo-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent {
  progress = 0;
  size:any=4;
  page:any=1;

  selectedFiles?: FileList;
  currentFile?: File;
 

  fileInfos?: Observable<any>;

  constructor(private uploadService: TodoServiceService ) { 
    this.fileInfos = this.uploadService.getFiles();
    console.log(this.fileInfos);
    

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.uploadFile(this.currentFile).subscribe({
          next: (event: any) => {
            this.progress = this.progress + 100;
            this.fileInfos = this.uploadService.getFiles();
            if (this.progress <= 100) {
              alert('file uploaded successfully');
              window.location.reload();
            } 
          },
          error: (err: any) => {
            this.progress = 0;
            alert('Could not upload the file!');
            this.currentFile = undefined;
            window.location.reload();
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }

  onDelete(id: any) {
    console.log(id);
    this.uploadService.deleteFile(id).subscribe(() => {
      alert('File deleted successfully');
      this.fileInfos = this.uploadService.getFiles();
    });
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      const files: File[] = Array.from(this.selectedFiles);
      if(files.length >5)
      {
        alert("selected items will not be more than 5");
        window.location.reload();
      }else{
       for(let file of files){
       this.currentFile=file
        this.uploadService.uploadFile(this.currentFile).subscribe({
          complete: () => {
                this.fileInfos = this.uploadService.getFiles();
              // alert('file uploaded successfully')
          },
          error: (err: any) => {
            alert('Could not upload the file!');
            this.currentFile = undefined;
            window.location.reload();
          }
        });
      }
    }
  }
    }

}

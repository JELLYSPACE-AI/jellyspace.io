import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from '../app.service';

@Component({
  selector: 'app-account-handler-details',
  templateUrl: './account-handler-details.component.html',
  styleUrls: ['./account-handler-details.component.css'],
})
export class AccountHandlerDetailsComponent implements OnInit {
  selectedFiles!: FileList;
  imagePath: any;
  fileData: any;
  url: any;
  imgShow: boolean = true;
  uploading: boolean = false; // New flag to track upload status
  uploadSuccess: boolean = false; // Flag to indicate successful upload
  constructor(
    private service: AppService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  public fieldTextType1: boolean = false;
  public fieldTextType2: boolean = false;
  public pWord: string = ''; // For Password field
  public confirmPWord: string = ''; // For Confirm Password field
  managerList: any = [];
  bidFlag: boolean = false;
  collabratorFlag: boolean = false;

  public fName: any;
  public lName: any;
  public eMail: any;
  public mobileNo: any;
  public title: any;
  public file: any;

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  ngOnInit(): void {
    this.fName = localStorage.getItem('otherFName');
    this.lName = localStorage.getItem('otherLName');
    this.eMail = localStorage.getItem('othereMail');
    this.mobileNo = localStorage.getItem('otherMobileNo');
    this.title = localStorage.getItem('otherTitle');
    this.file = localStorage.getItem('imagepath');
    this.managerList = [
      { label: 'Yes', value: '0' },
      { label: 'No', value: '1' },
    ];
  }

  selectBidManager(item: any) {
    this.collabratorFlag = item === 'Yes';
  }

  onChangeCollabrator(eve: any) {
    this.bidFlag = eve.target.checked;
  }

  selectImage(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.uploading = true; // Set the flag to true while uploading
      this.uploadSuccess = false; // Reset upload success flag
      const filePath = `companyImages/${selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, selectedFile);

      // Monitor the upload process
      task.snapshotChanges().subscribe(
        (snapshot) => {
          // Check if the upload is complete
          if (snapshot?.state === 'success') {
            // Get the download URL once the upload is complete
            fileRef.getDownloadURL().subscribe(
              (downloadURL) => {
                this.url = downloadURL;
                console.log('Image URL after successful upload:', this.url); // Log the image URL
                this.imgShow = false;
                this.uploading = false; // Reset the flag after upload
                this.uploadSuccess = true; // Set upload success flag
              },
              (error) => {
                console.error('Error getting download URL:', error); // Log any error getting download URL
                this.uploading = false; // Reset the flag on error
                this.uploadSuccess = false;
              }
            );
          }
        },
        (error) => {
          console.error('Error uploading file:', error); // Log any error during upload
          this.uploading = false; // Reset the flag on error
          this.uploadSuccess = false;
        }
      );

      // For displaying image preview
      const reader = new FileReader();
      reader.onload = (_event) => {
        this.url = reader.result;
      };
      reader.readAsDataURL(selectedFile);
      this.fileData = selectedFile;
    }
  }

  nextClick() {
    if (this.uploading) {
      // If uploading is still in progress, do not proceed
      alert('Please wait until the image upload is complete.');
      return;
    }

    if (!this.fileData) {
      console.error('No file selected');
      return;
    }

    const params = {
      email: this.eMail,
      name: `${this.fName} ${this.lName}`,
      fileUrl: this.url,
    };

    localStorage.setItem('nameOTP', `${this.fName} ${this.lName}`);
    localStorage.setItem('otherFName', this.fName);
    localStorage.setItem('otherLName', this.lName);
    localStorage.setItem('othereMail', this.eMail);
    localStorage.setItem('registerEmail', this.eMail);
    localStorage.setItem('otherPWord', this.pWord);
    localStorage.setItem('otherTitle', this.title);
    localStorage.setItem('otherMobileNo', this.mobileNo);
    localStorage.setItem('otherImage', this.url);

    this.service.sendOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['email-verification']);
      } else {
        alert(data.message);
      }
    });
  }
}

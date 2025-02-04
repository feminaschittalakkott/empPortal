import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  status: boolean = false;
  proPic: any = "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";
  adminData: any = {};

  constructor(private api: ApiService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAdmin().subscribe({
      next: (res: any) => {
        console.log(res);
        this.adminData = res;
        if (res.profile) {
          this.proPic = res.profile;
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getFile(e: any) {
    const file = e.target.files[0]
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event: any) => {
      console.log(event.target.result)
      this.adminData.profile = event.target.result
      this.proPic = event.target.result
    }
  }

  handleUpdate() {
    console.log(this.adminData)
    this.api.updateAdmin(this.adminData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toaster.success("Profile Updated!!!")
        this.router.navigateByUrl('')
      },
      error: (error) => {
        console.error(error)
        this.toaster.error("Failed Profile Updation!!!")
      }
    })
  }

  editButton() {
    this.status = true;
  }
  cancelButton() {
    this.status = false;
  }

}

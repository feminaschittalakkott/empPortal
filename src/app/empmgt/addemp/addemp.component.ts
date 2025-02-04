import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrl: './addemp.component.css'
})
export class AddempComponent {

  formData: any = {
    id: '', name: '', phone: '', department: ''
  }

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  onSubmit() {
    console.log(this.formData);
    this.api.addEmployee(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Employee Added Successfully!');
        this.router.navigate(['/empmgt']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error Adding Employee!!');
      }
    })
  }

}

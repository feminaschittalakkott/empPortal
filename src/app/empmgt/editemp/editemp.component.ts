import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrl: './editemp.component.css'
})
export class EditempComponent {
  eid: any = "";
  employee: any = {
    id: "", name: "", phone: "", department: ""
  }
  constructor(private actroute: ActivatedRoute, private api: ApiService, private toastr: ToastrService, private router: Router) {
    this.actroute.params.subscribe({
      next: (res: any) => {
        this.eid = res.id
        console.log(this.eid)
        this.api.getEmp(this.eid).subscribe({
          next: (res: any) => {
            this.employee = res
            console.log(this.employee)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    })
  }

  handleEdit(){
    console.log(this.employee)
    this.api.editEmployee(this.eid, this.employee).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toastr.success('Employee Updated Successfully!')
        this.router.navigate(['/empmgt'])
      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error('Updating failed!!!')
      }
    })
  }
}

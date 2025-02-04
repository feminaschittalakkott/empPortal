import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrl: './emplist.component.css'
})
export class EmplistComponent implements OnInit {
  employees: any = [];
  dt: Date = new Date();
  searchKey: string = "";
  p: number = 1;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.apiService.getEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.employees = res;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  handleDelete(id: any) {
    this.apiService.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Employee removed successfully!!')
        this.ngOnInit()
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Something went wrong!')
      }
    })
  }

  sortById() {
    this.employees.sort((a: any, b: any) => a.id - b.id);
  }
  sortByName() {
    this.employees.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  generatePDF() {
    const doc = new jsPDF();
    const head: any = [["ID", "Name", "Phone", "Department"]]
    const body: any = []

    this.employees.forEach((i: any) => {
      body.push([i.id, i.name, i.phone, i.department])
    })

    doc.setFontSize(16)
    doc.text("All Employees", 10, 10)
    autoTable(doc, {
      head, body
    })

    doc.output('dataurlnewwindow')
    doc.save('employees.pdf')
  }

}

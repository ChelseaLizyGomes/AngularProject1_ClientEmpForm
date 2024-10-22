import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee } from '../../model/interface/role';
import { Client } from '../../model/Client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit{

  projectForm: FormGroup= new FormGroup({
    clientProjectId: new FormControl(0),
  projectName: new FormControl(""),
  startDate:new FormControl(""),
  expectedEndDate: new FormControl(""),
  leadByEmpId: new FormControl(""),
  completedDate: new FormControl(""),
  contactPerson: new FormControl(""),
  contactPersonContactNo: new FormControl(""),
  totalEmpWorking: new FormControl(""),
  projectCost: new FormControl(""),
  projectDetails: new FormControl(""),
  contactPersonEmailId: new FormControl(""),
  clientId: new FormControl("")
  })

  constructor(private clientSrv : ClientService) {
   
  }
 
  employeeList : Employee[]=[];
  clientList: Client[]=[];

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllClients();
  }

  getAllEmployee(){
    this.clientSrv.getAllEmployee().subscribe((res:APIResponseModel)=>{
     
this.employeeList = res.data;
console.log('employeeList',this.employeeList)

    })
  }

  getAllClients(){
    this.clientSrv.getAllClients().subscribe((res:APIResponseModel)=>{
this.clientList = res.data;
    })
  }

  onSaveProject(){
const formValue = this.projectForm.value;
debugger;
this.clientSrv.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel)=>{
  if(res.result){
    alert('Project created Sucess')
  }else {
    alert('res.message')
  }
})
  }
}

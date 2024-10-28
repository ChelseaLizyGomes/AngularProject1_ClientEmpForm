import { Component, OnInit, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators} from "@angular/forms";
import { ClientService } from "../../services/client.service";
import { APIResponseModel, ClientProject, Employee } from "../../model/interface/role";
import { Client } from "../../model/Client";
import { CommonModule, JsonPipe } from "@angular/common";
import { AlertComponent } from "../../ResuableComponents/alert/alert.component";

@Component({
  selector: "app-client-project",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: "./client-project.component.html",
  styleUrl: "./client-project.component.css",
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl(""),
  });

  constructor(private clientSrv: ClientService) {}

  employeeList: Employee[] = [];
  clientList: Client[] = [];

  projectList = signal<ClientProject[]>([])

  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllClients();
    this.getAllClientProjects ();
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
      console.log("employeeList", this.employeeList);
    });
  }

  getAllClients() {
    this.clientSrv.getAllClients().subscribe((res: APIResponseModel) => {
      this.clientList = res.data;
    });
  }

  getAllClientProjects (){
    this.clientSrv.getAllClientProjects().subscribe((res:APIResponseModel)=>
    {
      this.projectList.set(res.data)
    })
  }

  onSaveProject() {
    console.log(this.projectForm.value)
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv
      .addClientProjectUpdate(formValue)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert("Project created Sucess");
        } else {
          alert(res.message);
        }
      });
  }
}

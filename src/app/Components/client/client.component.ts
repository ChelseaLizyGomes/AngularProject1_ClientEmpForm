import { Component,OnInit, signal } from '@angular/core';
import { Client } from '../../model/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject } from '../../model/interface/role';
import { inject } from '@angular/core/testing';
import { AsyncPipe, DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../ResuableComponents/alert/alert.component';
import { MybuttonComponent } from '../../ResuableComponents/mybutton/mybutton.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, LowerCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MybuttonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  currentDate : Date= new Date();
  
clientObj: Client = new Client();
clientList: Client[]=[];

firstName= signal("Angular");
  
// Constructor injection
constructor(private clientService: ClientService) {}

userList$: Observable<any> = new Observable<any>;

ngOnInit(): void {
  this.loadClient();
  this.userList$ = this.clientService.getAllUser();
}

changeFName(){
  this.firstName.set("ReactJs")
}

loadClient(){
this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
this.clientList = res.data;
})
}

onSaveClient(){
  this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
    if(res.result){
      alert("Client Created Success")
      this.loadClient();
      this.clientObj =new Client()
    }else {
      alert(res.message)
    }
  })
}

onEdit(data:Client){
  this.clientObj = data;
}

onDelete(id:number){
  const isDelete = confirm("Are you sure you want to delete?");
 
if(isDelete){
this.clientService.deleteClientById(id).subscribe(
  (res: APIResponseModel) => {
    if (res.result) {
      alert("Client Deleted Successfully");
      this.loadClient();
    } else {
      alert(res.message);
    }
  },
  (error) => {
    console.error("Delete operation failed:", error);
    console.log(`Attempting to delete client with ID: ${id}`);
   
    alert("An error occurred while deleting the client. Please try again.");
  }
);
};
};
}


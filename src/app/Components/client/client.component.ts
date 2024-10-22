import { Component,OnInit } from '@angular/core';
import { Client } from '../../model/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  
clientObj: Client = new Client();
clientList: Client[]=[];


// Constructor injection
constructor(private clientService: ClientService) {}

ngOnInit(): void {
  this.loadClient();
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


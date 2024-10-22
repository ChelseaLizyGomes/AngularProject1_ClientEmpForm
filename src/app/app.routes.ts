import { Routes } from '@angular/router';
import { MasterComponent } from './Components/master/master.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ClientComponent } from './Components/client/client.component';
import { ClientProjectComponent } from './Components/client-project/client-project.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'master',
        pathMatch: 'full'
    },
    {
        path:'master',
        component: MasterComponent
    },
    {
        path:'employee',
        component: EmployeeComponent
    },
    {
        path:'client',
        component: ClientComponent
    },
    {
        path:'client-project',
        component: ClientProjectComponent
    },
];

import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {TableStudentsComponent} from "../../../shared/components/table-students/table-students.component";

@Component({
  selector: 'app-student-users',
  standalone: true,
  imports: [
    HeaderComponent,
    TableStudentsComponent
  ],
  templateUrl: './student-users.component.html',
  styleUrl: './student-users.component.css'
})
export class StudentUsersComponent {

}

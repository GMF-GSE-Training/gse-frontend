import { Component } from '@angular/core';
import { NavbarComponent } from '../../../component/navbar/navbar.component';
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-add-curriculum',
  standalone: true,
  imports: [
    NavbarComponent,
    InputTextComponent,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
  ],
  templateUrl: './add-curriculum.component.html',
  styleUrl: './add-curriculum.component.css'
})
export class AddCurriculumComponent {

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-add-curriculum',
  standalone: true,
  imports: [
    HeaderComponent,
    InputTextComponent,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
  ],
  templateUrl: './add-curriculum.component.html',
  styleUrl: './add-curriculum.component.css'
})
export class AddCurriculumComponent {

}

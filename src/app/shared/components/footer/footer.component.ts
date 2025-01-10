import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isAuth } from '../../functions/is-auth';
import { Observable } from 'rxjs';
import { Constants } from '../../utilities/constant';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  isAuth$: Observable<boolean> = isAuth();

  constants = inject(Constants);

  dateOfToday = new Date() + `${this.constants.dateFormat}`;

}

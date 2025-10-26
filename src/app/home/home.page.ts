import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  lastName: string = 'Comparada';
  firstName: string = 'Randale';
  middleInitial: string = 'R.';
  address: string = '123 Main St, Singalat, Palayan City';
  telephoneNumber: string = '09946379151';
  age: number = 20;
  civilStatus: string = 'Single';
  emailAddress: string = 'randalecomparada@gmail.com';

  displayInfo: boolean = false;

  constructor(private alertController: AlertController) {}

  showInfo() {
    this.displayInfo = true;
    console.log('Displaying personal info.');
  }

  clearInfo() {
    this.displayInfo = false;
    console.log('Clearing personal info.');
  }
}
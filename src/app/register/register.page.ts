import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) {}

  async registerUser() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: 'Please enter a username and password.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const payload = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost/php-backend/register.php', payload)
      .pipe(catchError(err => of({ success: false, message: err.message || 'Network error' })))
      .subscribe(async res => {
        if (res && res.success) {
          const alert = await this.alertController.create({ header: 'Success', message: res.message || 'Registration successful', buttons: ['OK'] });
          await alert.present();
          this.router.navigate(['/login']);
        } else {
          const alert = await this.alertController.create({ header: 'Registration failed', message: res.message || 'Failed', buttons: ['OK'] });
          await alert.present();
        }
      });
  }
}
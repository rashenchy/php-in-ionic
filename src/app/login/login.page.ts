import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) {}

  async loginUser() {
    if (!this.username || !this.password) {
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: 'Please enter username and password.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const payload = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost/php-backend/login.php', payload)
      .pipe(catchError(err => of({ success: false, message: err.message || 'Network error' })))
      .subscribe(async res => {
        if (res && res.success) {
          this.router.navigate(['/home']);
        } else {
          const alert = await this.alertController.create({ header: 'Login failed', message: res.message || 'Invalid credentials', buttons: ['OK'] });
          await alert.present();
        }
      });
  }
}
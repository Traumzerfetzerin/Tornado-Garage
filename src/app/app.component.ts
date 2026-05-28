import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ServiceComponent } from '../app/service/service.component';
import { ContactComponent } from '../app/contact/contact.component';
// import AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ServiceComponent,
    ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tornado-Garage';


  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'de';
    this.translate.setDefaultLang('de');
    this.translate.use(savedLang);
  }


  // ngAfterViewInit(): void {
  //   AOS.init({
  //     duration: 800,
  //     once: true,
  //     offset: 120
  //   });
  // }
}

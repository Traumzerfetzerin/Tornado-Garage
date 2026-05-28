import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './share/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent
  ],
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
}
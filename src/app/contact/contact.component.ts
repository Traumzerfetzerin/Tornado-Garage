import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})


export class ContactComponent {
  contactForm: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;


  /**
   * Creates the contact form and injects the required Angular services.
   *
   * The form contains the following fields:
   * - `name`: Required text field for the sender's name.
   * - `email`: Required field with email and pattern validation.
   * - `message`: Required textarea for the message content.
   * - `acceptPolicy`: Required checkbox that must be checked.
   *
   * @param {Router} router - Angular router used for navigation.
   * @param {FormBuilder} fb - Service for creating reactive form groups and controls.
   * @param {TranslateService} translate - Service for accessing the current application language.
   */
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],

      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,20}$/)]],

      email: ['', [Validators.required, Validators.email]],

      message: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue]
    });
  }



  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const form = this.contactForm.value;
    const currentLang = this.translate.currentLang || 'de';

    Promise.all([


      emailjs.send(
        'service_tqi1qh9',
        'template_ux9g7ar',
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          subject:
            currentLang === 'de'
              ? 'Neue Kontaktanfrage'
              : 'New Contact Request'
        },
        'mb7tyX9XDp8u4Ht0l'
      ),


      emailjs.send(
        'service_tqi1qh9',
        'template_3m6x257',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          autoReplySubject:
            currentLang === 'de'
              ? 'Wir haben Ihre Nachricht erhalten'
              : 'We have received your message',

          autoReplyMessage:
            currentLang === 'de'
              ? `Hallo ${form.name},

              Vielen Dank für Ihre Nachricht.

              Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen zurück.

              Tom & Nadja
              Tornado-Garage`
              : `Hi ${form.name},

                Thank you for reaching out.

                We have received your enquiry and will get back to you as soon as possible.

              Tom & Nadja
              Tornado-Garage`
        },
        'mb7tyX9XDp8u4Ht0l'
      )

    ])

      .then(() => {
        this.showSuccessMessage = true;
        this.showErrorMessage = false;

        this.contactForm.reset({
          name: '',
          phone: '',
          email: '',
          message: '',
          acceptPolicy: false
        });

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 4000);
      })

      .catch((error) => {
        console.error('EmailJS Error:', error);

        this.showErrorMessage = true;
        this.showSuccessMessage = false;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 4000);
      });
  }
}
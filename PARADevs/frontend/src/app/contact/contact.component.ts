import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      inquiryType: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  get f() {
    return this.contactForm.controls as { [key: string]: FormControl };
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    console.log("Form Data: ", this.contactForm.value);

    this.http.post('http://localhost:5000/api/contact', this.contactForm.value).subscribe(
      (response) => {
        console.log(response);
        alert('Form has been submitted successfully!');
        this.contactForm.reset(); // Reset form after successful submission
      },
      (error) => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  }
}

import { Component } from '@angular/core';
import { ShelterService } from '../services/shelter.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {
  shelters: any[] = [];
  newShelter = {
    name: '',
    location: '',
    description: '',
    logoUrl: '',
    fbUrl: ''
  };

  constructor(private shelterService: ShelterService) {}

  ngOnInit() {
    this.getShelters();
  }

  getShelters() {
    this.shelterService.getShelters().subscribe((data: any) => {
      this.shelters = data;
    });
  }

  createShelter() {
    this.shelterService.createShelter(this.newShelter).subscribe((data) => {
      this.shelters.push(data);
      this.resetForm();
    });
  }

  deleteShelter(id: string) {
    this.shelterService.deleteShelter(id).subscribe(() => {
      this.shelters = this.shelters.filter(shelter => shelter._id !== id);
    });
  }

  updateShelter(id: string, updatedShelter: any) {
    this.shelterService.updateShelter(id, updatedShelter).subscribe((data) => {
      const index = this.shelters.findIndex(shelter => shelter._id === id);
      if (index !== -1) this.shelters[index] = data;
    });
  }

  resetForm() {
    this.newShelter = {
      name: '',
      location: '',
      description: '',
      logoUrl: '',
      fbUrl: ''
    };
  }
}

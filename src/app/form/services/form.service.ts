import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Field, Section } from '../interface/section';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _section: BehaviorSubject<Section[]> = new BehaviorSubject<Section []>([]);
  private _isClickable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _uniqueIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  // Getter for the unique IDs observable
  get uniqueIds$(): Observable<string[]> {
    return this._uniqueIds.asObservable();
  }

  // Getter for the current unique IDs value
  get uniqueIds(): string[] {
    return this._uniqueIds.getValue();
  }

  // Getter for the section observable
  get section$(): Observable<Section[]> {
    return this._section.asObservable();
  }

  // Getter for the current section value
  get section(): Section[] {
    return this._section.getValue();
  }

  // Setter for updating the section
  set section(sections: Section[]) {
    this._section.next(sections);
  }

  // Method to add a new section
  addSection(section: Section): void {
    this._section.next([...this.section, section]);
  }

  // Method to edit an existing section
  editSection(updatedSection: Section): void {
    const sectionIndex = this.section.findIndex(section => section.id === updatedSection.id);
    if (sectionIndex !== -1) {
      this.section[sectionIndex] = updatedSection;
      this._section.next([...this.section]);
    } else {
      console.warn('Section not found');
    }
  }

  // Method to remove a section
  removeSection(sectionId: string): void {
    this._section.next(this.section.filter(section => section.id !== sectionId));
  }

  // Method to add a field to a section
  addFieldToSection(sectionId: string, field: Field): void {
    const sectionIndex = this.section.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
      this.section[sectionIndex].fields.push(field);
      this._section.next([...this.section]);
    } else {
      console.warn('Section not found');
    }
  }

  // Method to edit a field within a section
  editFieldInSection(sectionId: string, updatedField: Field): void {
    const sectionIndex = this.section.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) {
      console.warn('Section not found');
      return ;
    } 
    const fieldIndex = this.section[sectionIndex].fields.findIndex(field => field.id === updatedField.id);
    if (fieldIndex === -1) {
      console.warn('Field not found');
      return ;
    }
    this.section[sectionIndex].fields[fieldIndex] = updatedField;
    this._section.next([...this.section]);
  }

  // Method to remove a field from a section
  removeFieldFromSection(sectionId: string, fieldId: string): void {
    const sectionIndex = this.section.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1) {
      this.section[sectionIndex].fields = this.section[sectionIndex].fields.filter(field => field.id !== fieldId);
      this._section.next([...this.section]);
    } else {
      console.warn('Section not found');
    }
  }

  // Method to generate a unique ID
  generateUniqueId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    let isUnique = false;
  
    while (!isUnique) {
      uniqueId = Array.from({ length: 7 }, 
        () => characters.charAt(Math.floor(Math.random() * characters.length))
      ).join('');
  
      // Check if the generated ID is unique
      const currentUniqueIds = this._uniqueIds.getValue();
      if (!currentUniqueIds.includes(uniqueId)) {
        this._uniqueIds.next([...currentUniqueIds, uniqueId]);
        isUnique = true;
      }
    }
  
    return uniqueId;
  }
}

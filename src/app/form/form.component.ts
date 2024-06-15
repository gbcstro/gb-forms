import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Section } from './interface/section';
import { FormService } from './services/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  form: FormGroup = this._fb.group({});

  section$: Observable<Section[]>;

  constructor(
    private _fb: FormBuilder,
    private dp: DatePipe,
    private _formService: FormService
  ) {
    this.section$ = this._formService.section$;
  }

  ngOnInit(): void {

  }

  generateForm(form: Section[]) {
    form.forEach((section) => {
      //Create section
      this.form.addControl(section.id, this._fb.group({}));

      //Add field to section
      const sectionForm = this.form.get(section.id) as FormGroup;
      section.fields?.forEach((field) => {
        let control;

        switch (field.type) {
          case 'checkbox':
            control = this._fb.array(
              field.options?.map(opt =>
                this._fb.group({
                  id: [opt.id],
                  option: [opt.option],
                  selected: [opt.selected],
                })
              ) || []
            );
            break;

          case 'dropdown':
            control = this._fb.control(
              field.value ? field.value.name : null,
              field.required ? Validators.required : null
            );
            break;

          case 'date_picker':
            control = this._fb.control(
              field.value,
              field.required ? Validators.required : null
            );
            break;

          case 'toggle':
            control = this._fb.control(
              field.value !== '' ? field.value : false,
              field.required ? Validators.required : null
            );
            break;
            
          default:
            control = this._fb.control(
              field.value,
              field.required ? Validators.required : null
            );
            break;
        }

        sectionForm.addControl(field.id, control);

        if (field.disabled) {
          const _field = sectionForm.controls[field.id];
          _field.disable();
          _field.clearValidators();
          _field.updateValueAndValidity();
        }

      });
    });
  }

  choices(section: string, control: string): FormArray {
    return this.form.get(section)?.get(control) as FormArray;
  }

  ngOnDestroy(): void {

  }
}

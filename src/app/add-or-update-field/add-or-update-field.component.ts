import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DefaultFileExtenstions, Field, FileExtenstion, Section } from '../form/interface/section';
import { FormService } from '../form/services/form.service';

@Component({
  selector: 'app-add-or-update-field',
  templateUrl: './add-or-update-field.component.html',
  styleUrls: ['./add-or-update-field.component.scss']
})
export class AddOrUpdateFieldComponent implements OnInit, OnDestroy {

  sections: Section[] = [];

  default_extenstions: FileExtenstion[] = DefaultFileExtenstions;

  fieldType = [
    'short_answer',
    'paragraph',
    'number',
    'toggle',
    'file_upload',
    'multiple_choice',
    'checkbox',
    'boolean',
    'dropdown',
    'date_picker',
    'date_range',
    'time',
    'rating',
    'label'
  ];

  field: FormGroup = new FormGroup({
    section: new FormControl(null, Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('short_answer', Validators.required),
    value: new FormControl(null),
    placeholder: new FormControl(''),
    description: new FormControl(''),
    size: new FormControl(100, Validators.required),
    disabled: new FormControl(false, Validators.required),
    required: new FormControl(false, Validators.required),
    options: new FormArray([
      new FormGroup({
        id:  new FormControl(this._formService.generateUniqueId()),
        name:  new FormControl('', Validators.required),
        selected: new FormControl(false)
      }),
      new FormGroup({
        id:  new FormControl(this._formService.generateUniqueId()),
        name:  new FormControl('', Validators.required),
        selected: new FormControl(false, Validators.required)
      }),
    ]),
    settings: new FormGroup({
      file_upload_settings: new FormGroup({
        restricted: new FormControl(false, Validators.required),
        number_of_files: new FormControl(1, Validators.required),
        max_size: new FormControl(2000000, Validators.required),
        extensions: new FormArray([]),
      })
    })
  });

  uniqueIDs: string[] = [];
  
  constructor (
    private _fb: FormBuilder,
    private _formService: FormService
  ) {

  }

  ngOnInit(): void {
    this.default_extenstions.forEach((ext) => {
      this.addExtention(ext);
    });
  }

  get options(): FormArray {
    return this.field.get('options') as FormArray;
  }

  get file_extenstions(): FormArray {
    return this.field.get('settings')?.get('file_upload_settings')?.get('extensions') as FormArray;
  }

  get file_settings(): FormGroup {
    return this.field.get('settings')?.get('file_upload_settings') as FormGroup;
  }

  addOption() {
    this.options.push(
      this._fb.group({
        id: [this._formService.generateUniqueId()],
        name: ['', Validators.required],
      })
    );
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  addExtention(ext: FileExtenstion) {
    this.file_extenstions.push(
      this._fb.group({
        value: [ext.value],
        label: [ext.label],
        selected: [ext.selected, Validators.required],
      })
    );
  }

  addField() {
    var field: Field;
    const {
      section,
      name,
      type,
      value,
      placeholder,
      description,
      size,
      disabled,
      required,
      options,
      settings
    } = this.field.value;

    console.log(this.field.value);
  }

  resetForm(): void {
    this.field.reset({
      section: null,
      name: '',
      type: 'short_answer',
      value: null,
      placeholder: '',
      description: '',
      size: 100,
      disabled: false,
      required: false,
      options: [
        {
          id: this._formService.generateUniqueId(),
          name: '',
          selected: false
        },
        {
          id: this._formService.generateUniqueId(),
          name: '',
          selected: false
        }
      ],
      settings: {
        file_upload_settings: {
          restricted: false,
          number_of_files: 1,
          max_size: 2000000,
          extensions: []
        }
      }
    });
  }

  setInputType() {
    const typeMap: { [key: string]: string } = {
      short_answer: 'text',
      number: 'number',
      time: 'time',
    };
    
    return typeMap[this.field.controls['type'].value] || '';
  }

  ngOnDestroy(): void {
    
  }
}

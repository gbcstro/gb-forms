import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormService } from '../form/services/form.service';
import { Section } from '../form/interface/section';

@Component({
  selector: 'app-add-or-update-section',
  templateUrl: './add-or-update-section.component.html',
  styleUrls: ['./add-or-update-section.component.scss']
})
export class AddOrUpdateSectionComponent implements OnInit, OnDestroy {

  section: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  constructor (
    private modal: BsModalRef,
    private _formService: FormService
  ) {

  }

  ngOnInit(): void {
    
  }

  addSec(): any {
    const { name, description } = this.section.value;
    const section: Section = {
      id: this._formService.generateUniqueId(),
      label: name,
      description: description,
      fields: [],
    };

    this._formService.addSection(section);
    this.close();
    this.section.reset({
      name: '',
      description: '',
    });
  }

  close() {
    this.modal.hide();
  }

  ngOnDestroy(): void {
    
  }

}

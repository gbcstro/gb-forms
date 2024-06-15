import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateFieldComponent } from './add-or-update-field.component';

describe('AddOrUpdateFieldComponent', () => {
  let component: AddOrUpdateFieldComponent;
  let fixture: ComponentFixture<AddOrUpdateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrUpdateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

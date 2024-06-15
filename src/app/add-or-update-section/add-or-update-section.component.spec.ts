import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSectionComponent } from './add-or-update-section.component';

describe('AddOrUpdateSectionComponent', () => {
  let component: AddOrUpdateSectionComponent;
  let fixture: ComponentFixture<AddOrUpdateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrUpdateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

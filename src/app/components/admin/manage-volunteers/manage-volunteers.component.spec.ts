import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunteersComponent } from './manage-volunteers.component';

describe('ManageVolunteersComponent', () => {
  let component: ManageVolunteersComponent;
  let fixture: ComponentFixture<ManageVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVolunteersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

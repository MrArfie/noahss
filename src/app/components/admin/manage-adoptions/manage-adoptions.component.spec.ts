import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdoptionsComponent } from './manage-adoptions.component';

describe('ManageAdoptionsComponent', () => {
  let component: ManageAdoptionsComponent;
  let fixture: ComponentFixture<ManageAdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAdoptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

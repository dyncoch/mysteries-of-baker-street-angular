import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsButtonsComponent } from './locations-buttons.component';

describe('LocationsButtonsComponent', () => {
  let component: LocationsButtonsComponent;
  let fixture: ComponentFixture<LocationsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

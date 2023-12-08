import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintViewComponent } from './hint-view.component';

describe('HintViewComponent', () => {
  let component: HintViewComponent;
  let fixture: ComponentFixture<HintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

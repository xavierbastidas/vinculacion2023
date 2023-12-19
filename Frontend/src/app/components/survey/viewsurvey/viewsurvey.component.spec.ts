import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsurveyComponent } from './viewsurvey.component';

describe('ViewsurveyComponent', () => {
  let component: ViewsurveyComponent;
  let fixture: ComponentFixture<ViewsurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

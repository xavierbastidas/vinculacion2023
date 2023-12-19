import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersurveyComponent } from './registersurvey.component';

describe('RegistersurveyComponent', () => {
  let component: RegistersurveyComponent;
  let fixture: ComponentFixture<RegistersurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistersurveyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistersurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

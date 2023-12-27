import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsurveysComponent } from './viewsurveys.component';

describe('ViewsurveysComponent', () => {
  let component: ViewsurveysComponent;
  let fixture: ComponentFixture<ViewsurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsurveysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

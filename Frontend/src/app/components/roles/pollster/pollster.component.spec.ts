import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsterComponent } from './pollster.component';

describe('PollsterComponent', () => {
  let component: PollsterComponent;
  let fixture: ComponentFixture<PollsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollsterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

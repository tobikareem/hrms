import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffMamnagementComponent } from './time-off-mamnagement.component';

describe('TimeOffMamnagementComponent', () => {
  let component: TimeOffMamnagementComponent;
  let fixture: ComponentFixture<TimeOffMamnagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOffMamnagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOffMamnagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

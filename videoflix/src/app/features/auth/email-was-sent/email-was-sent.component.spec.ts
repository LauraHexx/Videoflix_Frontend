import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailWasSentComponent } from './email-was-sent.component';

describe('EmailWasSentComponent', () => {
  let component: EmailWasSentComponent;
  let fixture: ComponentFixture<EmailWasSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailWasSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailWasSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

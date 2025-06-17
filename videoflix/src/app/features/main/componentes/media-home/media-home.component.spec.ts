import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHomeComponent } from './media-home.component';

describe('MediaHomeComponent', () => {
  let component: MediaHomeComponent;
  let fixture: ComponentFixture<MediaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

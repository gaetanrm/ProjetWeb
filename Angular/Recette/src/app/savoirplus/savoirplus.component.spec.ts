import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavoirplusComponent } from './savoirplus.component';

describe('SavoirplusComponent', () => {
  let component: SavoirplusComponent;
  let fixture: ComponentFixture<SavoirplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavoirplusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavoirplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

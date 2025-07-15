import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPopular } from './after-popular';

describe('AfterPopular', () => {
  let component: AfterPopular;
  let fixture: ComponentFixture<AfterPopular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterPopular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterPopular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

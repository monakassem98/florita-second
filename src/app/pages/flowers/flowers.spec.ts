import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flowers } from './flowers';

describe('Flowers', () => {
  let component: Flowers;
  let fixture: ComponentFixture<Flowers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flowers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flowers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

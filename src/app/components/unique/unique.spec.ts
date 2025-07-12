import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unique } from './unique';

describe('Unique', () => {
  let component: Unique;
  let fixture: ComponentFixture<Unique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

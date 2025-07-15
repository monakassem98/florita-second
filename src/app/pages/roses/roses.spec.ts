import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roses } from './roses';

describe('Roses', () => {
  let component: Roses;
  let fixture: ComponentFixture<Roses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

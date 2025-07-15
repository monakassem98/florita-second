import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tulips } from './tulips';

describe('Tulips', () => {
  let component: Tulips;
  let fixture: ComponentFixture<Tulips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tulips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tulips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

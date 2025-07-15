import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMain } from './product-main';

describe('ProductMain', () => {
  let component: ProductMain;
  let fixture: ComponentFixture<ProductMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

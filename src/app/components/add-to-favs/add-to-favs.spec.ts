import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavs } from './add-to-favs';

describe('AddToFavs', () => {
  let component: AddToFavs;
  let fixture: ComponentFixture<AddToFavs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToFavs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

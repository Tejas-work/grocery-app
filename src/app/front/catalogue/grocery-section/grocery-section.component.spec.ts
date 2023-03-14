import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocerySectionComponent } from './grocery-section.component';

describe('GrocerySectionComponent', () => {
  let component: GrocerySectionComponent;
  let fixture: ComponentFixture<GrocerySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrocerySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrocerySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

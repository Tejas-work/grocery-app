import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodThingsComponent } from './good-things.component';

describe('GoodThingsComponent', () => {
  let component: GoodThingsComponent;
  let fixture: ComponentFixture<GoodThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodThingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateResultComponent } from './aggregate-result.component';

describe('AggregateResultComponent', () => {
  let component: AggregateResultComponent;
  let fixture: ComponentFixture<AggregateResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregateResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggregateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

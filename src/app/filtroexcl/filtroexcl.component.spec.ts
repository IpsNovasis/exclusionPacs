import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroexclComponent } from './filtroexcl.component';

describe('FiltroexclComponent', () => {
  let component: FiltroexclComponent;
  let fixture: ComponentFixture<FiltroexclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroexclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroexclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

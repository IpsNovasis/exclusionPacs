import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InclusionComponent } from './inclusion.component';

describe('InclusionComponent', () => {
  let component: InclusionComponent;
  let fixture: ComponentFixture<InclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

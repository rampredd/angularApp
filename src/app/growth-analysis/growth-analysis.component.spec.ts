import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthAnalysisComponent } from './growth-analysis.component';

describe('GrowthAnalysisComponent', () => {
  let component: GrowthAnalysisComponent;
  let fixture: ComponentFixture<GrowthAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

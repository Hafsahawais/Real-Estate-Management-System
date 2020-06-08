import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListHomeComponent } from './project-list-home.component';

describe('IconsComponent', () => {
  let component: ProjectListHomeComponent;
  let fixture: ComponentFixture<ProjectListHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

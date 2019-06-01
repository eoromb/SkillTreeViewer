import { Component, OnInit, Input } from '@angular/core';
import { SkillViewModel } from '../../view-models/skill.view-model';

@Component({
  selector: 'stv-dependencies-list',
  templateUrl: './dependencies-list.component.html',
  styleUrls: ['./dependencies-list.component.scss']
})
export class DependenciesListComponent implements OnInit {
  @Input() dependencies: SkillViewModel[];
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }
}

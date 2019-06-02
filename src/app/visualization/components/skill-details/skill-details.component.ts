import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SkillsService } from '../../services/skills.service';
import { SkillViewModel } from '../../view-models/skill.view-model';

@Component({
  selector: 'stv-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit, OnDestroy {
  skill: SkillViewModel;
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute, private skillService: SkillsService) {
  }
  ngOnInit() {
    this.subs.push(this.route.data.subscribe(data => this.skill = data.skill));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  unlock() {
    this.skill = this.skillService.unlockSkill(this.skill.id);
  }
}

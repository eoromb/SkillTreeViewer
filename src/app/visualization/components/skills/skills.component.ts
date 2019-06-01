import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Network } from 'vis';
import { SkillsService } from '../../services/skills.service';
import { createTreeViewModel } from '../../view-models/tree.view-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'stv-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  network: Network;
  @ViewChild('treecontainer')
  treeContainer: ElementRef;
  @HostListener('window:resize')
  public detectResize(): void {
    this.network.redraw();
  }
  constructor(private skillService: SkillsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  destroy() {
    if (this.network != null) {
      this.network.destroy();
      this.network = null;
    }
  }
  draw() {
    this.destroy();
    const container = this.treeContainer.nativeElement;
    const treeViewModel = createTreeViewModel(this.skillService.getSkillTree());
    const options = {
      autoResize: false,
      interaction: {
        hover: true,
        dragNodes: false
      },
      layout: {
        hierarchical: {
          direction: 'LR',
          sortMethod: 'directed'
        }
      },
      edges: {
        chosen: false
      },
      nodes: {
        shape: 'box',
        widthConstraint: { minimum: 100 }
      },
    };
    this.network = new Network(container, treeViewModel, options);

    this.network.on('select', params => {
      const {nodes} = params;
      if (Array.isArray(nodes) && nodes.length > 0) {
        this.onNodeClicked(nodes[0]);
      }
    });
  }
  ngAfterViewInit(): void {
    this.draw();
  }
  onNodeClicked(nodeId) {
    this.router.navigate([`./${nodeId}`], { relativeTo: this.route });
  }
}

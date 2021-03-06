import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Network } from 'vis';
import { SkillsService } from '../../services/skills.service';
import { createGraphViewModel } from '../../view-models/graph.view-model';

/**
 * Shows skill tree
 */
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
  /**
   * Draws skill graph
   */
  draw() {
    this.destroy();
    const container = this.treeContainer.nativeElement;
    const treeViewModel = createGraphViewModel(this.skillService.getSkillTree());
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
  /**
   * On node clicked event
   * @param nodeId clicked node id
   */
  onNodeClicked(nodeId) {
    this.router.navigate([`./${nodeId}`], { relativeTo: this.route });
  }
}

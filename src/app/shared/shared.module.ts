import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatButtonModule, MatToolbarModule, MatListModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

const components = [LayoutComponent, NotFoundComponent];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class SharedModule { }

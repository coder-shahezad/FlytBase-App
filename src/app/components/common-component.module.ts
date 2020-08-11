import { BoxComponent } from './box/box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BoxComponent],
  imports: [CommonModule],
  exports: [BoxComponent],
})
export class CommonComponentModule {}

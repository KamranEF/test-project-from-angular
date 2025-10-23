import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Header } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, NzLayoutModule, NzMenuModule, NzIconModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {}

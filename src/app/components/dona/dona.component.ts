import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonaComponent implements OnInit {
  @Input() titulo: string;
  @Input()
  // Doughnut
  @Input('labels')
  doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: ['#9e120e', '#ff5800', '#f02059'] },
  ];

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
  @Input() comment: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  starFill(comment: number): number[] {
    const fill = Math.floor(comment);
    return [...Array(fill).keys()];
  }

  starHalf(comment: number): boolean {
    return comment % 1 > 0;
  }

  starEmpty(comment: number): number[] {
    const empty = Math.floor(5 - comment);
    return [...Array(empty).keys()];
  }
}

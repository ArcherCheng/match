import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-subject01',
  templateUrl: './subject01.component.html',
  styleUrls: ['./subject01.component.css']
})
export class Subject01Component implements OnInit {
  subject$ = new Subject();

  constructor() { }

  ngOnInit() {
  }

  // const sub1 = subject$.subscribe({
  //   next: (v) => console.log('observer1:' + v);
  // })

  // subject$.next(1);

}

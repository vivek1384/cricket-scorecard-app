import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../service.service';
import { Match } from '../app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [RouterLink, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  service = inject(ServiceService);
  matchList: Match[] = [];
  match: Match = new Match();
  isShow = false;
  textColor1 = '';
  textColor2 = '';
  textColor3 = '';
  textColor4 = '';

  ngOnInit(): void {
    this.getMatchList();
  }
  getMatchList() {
    this.service.getMatchList().subscribe((res) => {
      if (res) {
        this.matchList = res;
      }
    });
  }

  onClick(d: Match) {
    this.isShow = true;
    this.match = d;
  }
  close() {
    this.isShow = false;
    this.match = new Match();
  }
  // color() {
  //   for (let index = 0; index < this.match.commentry.length; index++) {
  //     if (this.match.commentry[index].includes(':')) {
  //       if(this.match.commentry[index].includes("Out")){
  //         this.textColor1 = 'red'
  //         this.textColor2 = '';
  //         this.textColor3 = '';
  //         this.textColor4 = '';
  //         this.match.commentry[index].color = 'red'
  //       }else if(this.match.commentry[index].includes("6") || this.match.commentry[index].includes("4")){
  //         this.textColor2 = 'green'
  //         this.textColor1 = '';
  //         this.textColor3 = '';
  //         this.textColor4 = '';
  //       }

  //     }else if(!this.match.commentry[index].includes(':')){
  //       if(this.match.commentry[index].includes("fifty") || this.match.commentry[index].includes("century")){
  //         this.textColor3 = 'yellow'
  //         this.textColor1 = '';
  //         this.textColor2 = '';
  //         this.textColor4 = '';
  //       }else{
  //         this.textColor4 = 'blueviolet'
  //         this.textColor1 = '';
  //         this.textColor2 = '';
  //         this.textColor3 = '';
  //       }
  //     }

  //     console.log(this.textColor1, index);
  //     console.log(this.textColor2, index);
  //     console.log(this.textColor3, index);
  //     console.log(this.textColor4, index);
  //   }
  // }
}

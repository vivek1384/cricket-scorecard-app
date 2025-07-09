import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cricket';

  header = 'home';
  home() {
    this.header = 'home';
  }
  add() {
    this.header = 'add';
  }
  history() {
    this.header = 'history';
  }
}
export class Player {
  id: any;
  name: string;
  team: string;
  role: string;
  isKeeper: string;
  isBowler: string;
  role2: string;
  strike: string;
  isBowling: string;
  run: number;
  ball: number;
  over: number;
  overBall: number;
  runGiven: number;
  wicketTaken: number;
  runOut: number;
  catch: number;
  fours: number;
  sixes: number;
  extra: number;
  isOut: any;
  sr: any;
  rr: any;
  catchBy: string;
  outBy: String;
  runOutBy: string;
  constructor() {
    this.id = undefined;
    this.name = '';
    this.team = '';
    this.role = '';
    this.isKeeper = '';
    this.isBowler = '';
    this.role2 = '';
    this.strike = '';
    this.isBowling = '';
    this.run = 0;
    this.ball = 0;
    this.over = 0;
    this.overBall = 0;
    this.runGiven = 0;
    this.wicketTaken = 0;
    this.runOut = 0;
    this.catch = 0;
    this.fours = 0;
    this.sixes = 0;
    this.extra = 0;
    this.isOut = '';
    this.sr = 0;
    this.rr = 0;
    this.catchBy = '';
    this.outBy = '';
    this.runOutBy = '';
  }
}

export class Team {
  id: any;
  name: string;
  players: Player[];
  totalScore: string;
  totalWicket: string;
  innings: string;
  target: string;
  extra: string;
  wide: string;
  noBall: string;
  byes: string;
  legByse: string;
  fours: string;
  sixes: string;
  constructor() {
    this.id = undefined;
    this.name = '';
    this.players = [];
    this.totalScore = '';
    this.totalWicket = '';
    this.innings = '';
    this.target = '';
    this.extra = '';
    this.wide = '';
    this.noBall = '';
    this.byes = '';
    this.legByse = '';
    this.fours = '';
    this.sixes = '';
  }
}

export class Format {
  id: any;
  name: string;
  over: string;
  constructor() {
    this.id = undefined;
    this.name = '';
    this.over = '';
  }
}

export class Update {
  id: undefined;
  ball: string;
  score: string;
  playerName: string;
  isNoball: string;
  isWide: string;
  wicket: string;
  constructor() {
    this.id = undefined;
    this.ball = '';
    this.score = '';
    this.playerName = '';
    this.isNoball = '';
    this.isWide = '';
    this.wicket = '';
  }
}

export class Match {
  id: any;
  team1: string;
  team2: string;
  winner: string;
  date: Date;
  commentry: any;
  score1: string;
  over1: string;
  score2: string;
  over2: string;
  constructor() {
    this.id = undefined;
    this.team1 = '';
    this.team2 = '';
    this.winner = '';
    this.date = new Date();
    this.commentry = [];
    this.score1 = '';
    this.over1 = '';
    this.score2 = '';
    this.over2 = '';
  }
}

export class PartnerShip {
  id: any;
  player1: string;
  player1run : number
  player1ball : number
  player2: string;
  player2run : number
  player2ball : number
  run: number;
  ball: number;
  matchId : any
  constructor() {
    this.id = undefined;
    this.player1 = '';
    this.player1run = 0
    this.player1ball = 0
    this.player2 = '';
    this.player2run = 0
    this.player2ball = 0
    this.run = 0;
    this.ball = 0;
    this.matchId = undefined
  }
}

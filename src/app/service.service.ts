import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Match, PartnerShip, Player, Team } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  http = inject(HttpClient);

  url = 'http://localhost:3001/';

  addTeam(d: Team) {
    return this.http.post(`${this.url}team`, d);
  }
  addPlayer(d: Player) {
    return this.http.post(`${this.url}player`, d);
  }
  getTeamlist() {
    return this.http.get<Team[]>(`${this.url}team`);
  }
  getTeambyName(n: string) {
    return this.http.get<Team[]>(`${this.url}team?name=` + n);
  }
  getTeambyId(i: any) {
    return this.http.get<Team>(`${this.url}team/` + i);
  }
  getPlayersbyTeam(n: string) {
    return this.http.get<Player[]>(`${this.url}player?team=` + n);
  }
  getPlayerbyName(n: string) {
    return this.http.get<Player[]>(`${this.url}player?name=` + n);
  }
  editPlayer(id: any, p: Player) {
    return this.http.put(`${this.url}player/` + id, p);
  }
  getPlayerbyId(o: any) {
    return this.http.get<Player>(`${this.url}player/` + o);
  }
  addMatch(d: Match) {
    return this.http.post(`${this.url}history`, d);
  }
  getMatchList() {
    return this.http.get<Match[]>(`${this.url}history`);
  }
  addPartnership(d: PartnerShip) {
    return this.http.post(`${this.url}partnership`, d);
  }
  getParList() {
    return this.http.get<PartnerShip[]>(`${this.url}partnership`);
  }
  delete(id: any) {
    return this.http.delete(`${this.url}partnership/` + id);
  }
  constructor() {}
}

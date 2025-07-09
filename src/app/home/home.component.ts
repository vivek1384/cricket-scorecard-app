import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Match, PartnerShip, Player, Team } from '../app.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  service = inject(ServiceService);

  ngOnInit(): void {
    this.getTeamlist();
    this.setMatch();
    this.getPartnershipList();
  }

  teamList: Team[] = [];
  batsMan1: Player = new Player();
  batsman1Id = '';
  batsMan2: Player = new Player();
  batsman2Id = '';
  batsMan3: Player = new Player();
  batsman3Id = '';
  bowler: Player = new Player();
  bowlerId = '';
  newBowlerId = '';
  team1: Team = new Team();
  team2: Team = new Team();
  team1Id = '';
  team2Id = '';
  team3Id: any = '';
  team4Id: any = '';
  isSet = false;
  team1Player: Player[] = [];
  team2Player: Player[] = [];
  team1Bowlers: Player[] = [];
  team2Bowlers: Player[] = [];
  over = 0;
  ball = 0;
  leagalBall = 0;
  contArr = ['', '', '', '', '', ''];
  isBowler = 'false';
  isShow = false;
  isShow2 = false;
  isShow3 = false;
  noBallRun = 0;
  outType = '';
  catchBy = '';
  runOutby = '';
  score = 0;
  totalWicket = 0;
  wideBall = 0;
  noBallTotal = 0;
  extra = 0;
  overAllRR: any = 0;
  requiredRR: any = 0;
  target = 0;
  innig = 'first';
  projectedScore = 0;
  matchHistory: Match = new Match();
  bm1Mile = 0;
  bm2Mile = 0;
  commentry: any = [];
  runScore: any = 0;
  isCommentry = true;
  currentPartnerShip: PartnerShip = new PartnerShip();
  partnershipList: PartnerShip[] = [];
  isNoball = false

  isCommentryorScorecard() {
    this.isCommentry = !this.isCommentry;
  }

  addCommentry(runScore: any) {
    if (this.batsMan1.strike == 'yes') {
      if(this.isNoball){
      this.commentry.push(
        `${this.over}.${this.leagalBall + 1} : ${this.bowler.name} to ${this.batsMan1.name}, ${runScore}`
      );
      this.isNoball = false
    }else{
      this.commentry.push(
        `${this.over}.${this.leagalBall} : ${this.bowler.name} to ${this.batsMan1.name}, ${runScore}`
      );
    }
    } else {
      if(this.isNoball){
        this.commentry.push(
          `${this.over}.${this.leagalBall + 1} : ${this.bowler.name} to ${this.batsMan2.name}, ${runScore}`
        );
        this.isNoball = false
      }else{
        this.commentry.push(
          `${this.over}.${this.leagalBall} : ${this.bowler.name} to ${this.batsMan2.name}, ${runScore}`
        );
      }
    }
  }

  getPartnershipList() {
    this.service.getParList().subscribe((res) => {
      if (res) {
        this.partnershipList = res;
      }
    });
  }
  deletePartnerList() {
    for (let index = 0; index < this.partnershipList.length; index++) {
      this.service.delete(this.partnershipList[index].id).subscribe((res) => {
        if (res) {
          console.log('hii');
        }
      });
    }
  }

  reset() {
    let isDel = confirm('Are you sure want to Reset the match?');
    if (isDel) {
      localStorage.removeItem('team1');
      localStorage.removeItem('team2');
      this.innig = 'first';
      this.isSet = false;
      this.team1Id = '';
      this.team1 = new Team();
      this.commentry = [];
      // this.team1Player = [];
      // this.team1Bowlers = [];
      this.team2Id = '';
      this.team2 = new Team();
      // this.team2Player = [];
      // this.team2Bowlers = [];
      for (let index = 0; index < this.team1Player.length; index++) {
        let id = this.team1Player[index].id;

        this.team1Player[index].run = 0;
        this.team1Player[index].ball = 0;
        this.team1Player[index].fours = 0;
        this.team1Player[index].sixes = 0;
        this.team1Player[index].sr = 0;
        this.team1Player[index].catch = 0;
        this.team1Player[index].runOut = 0;
        this.team1Player[index].isOut = '';
        this.team1Player[index].catchBy = '';
        this.team1Player[index].outBy = '';
        this.team1Player[index].runOutBy = '';

        this.team1Player[index].runGiven = 0;
        this.team1Player[index].overBall = 0;
        this.team1Player[index].over = 0;
        this.team1Player[index].rr = 0;
        this.team1Player[index].extra = 0;
        this.team1Player[index].wicketTaken = 0;

        this.editPlayer(id, this.team1Player[index]);
        this.deletePartnerList();
        this.currentPartnerShip = new PartnerShip();
        this.getPartnershipList();
      }
      for (let index = 0; index < this.team2Player.length; index++) {
        let id = this.team2Player[index].id;

        this.team2Player[index].run = 0;
        this.team2Player[index].ball = 0;
        this.team2Player[index].fours = 0;
        this.team2Player[index].sixes = 0;
        this.team2Player[index].sr = 0;
        this.team2Player[index].catch = 0;
        this.team2Player[index].runOut = 0;
        this.team2Player[index].isOut = '';
        this.team2Player[index].catchBy = '';
        this.team2Player[index].outBy = '';
        this.team2Player[index].runOutBy = '';

        this.team2Player[index].runGiven = 0;
        this.team2Player[index].overBall = 0;
        this.team2Player[index].over = 0;
        this.team2Player[index].rr = 0;
        this.team2Player[index].extra = 0;
        this.team2Player[index].wicketTaken = 0;

        this.editPlayer(id, this.team2Player[index]);
        this.deletePartnerList();
        this.currentPartnerShip = new PartnerShip();
        this.getPartnershipList();
      }
    }
  }
  calculate1() {
    this.batsMan1.sr = ((this.batsMan1.run / this.batsMan1.ball) * 100).toFixed(
      2
    );
    this.batsMan2.sr = ((this.batsMan2.run / this.batsMan2.ball) * 100).toFixed(
      2
    );
    this.bowler.rr = (
      this.bowler.runGiven /
      (this.bowler.over + this.bowler.overBall / 6)
    ).toFixed(2);
    this.editPlayer(this.batsMan1.id, this.batsMan1);
    this.editPlayer2(this.batsMan2.id, this.batsMan2);
    this.editPlayer2(this.bowler.id, this.bowler);
  }
  calculate() {
    this.score = 0;
    this.totalWicket = 0;
    this.extra = 0;
    this.over = 0;
    this.batsMan1.sr = ((this.batsMan1.run / this.batsMan1.ball) * 100).toFixed(
      2
    );
    this.batsMan2.sr = ((this.batsMan2.run / this.batsMan2.ball) * 100).toFixed(
      2
    );
    if (this.bm1Mile == 0 && this.batsMan1.run >= 50) {
      alert(`${this.batsMan1.name} reaches his fifty!`);
      this.commentry.push(`${this.batsMan1.name} reaches his fifty!`);
      this.bm1Mile = 50;
    } else if (this.bm2Mile == 0 && this.batsMan2.run >= 50) {
      alert(`${this.batsMan2.name} reaches his fifty!`);
      this.commentry.push(`${this.batsMan2.name} reaches his fifty!`);
      this.bm2Mile = 50;
    } else if (this.bm1Mile == 50 && this.batsMan1.run >= 100) {
      alert(`${this.batsMan1.name} reaches his century!`);
      this.commentry.push(`${this.batsMan1.name} reaches his century!`);
    } else if (this.bm2Mile == 50 && this.batsMan2.run >= 100) {
      alert(`${this.batsMan2.name} reaches his century!`);
      this.commentry.push(`${this.batsMan2.name} reaches his century!`);
    }

    this.bowler.rr = (
      this.bowler.runGiven /
      (this.bowler.over + this.bowler.overBall / 6)
    ).toFixed(2);
    for (let index = 0; index < this.team1Player.length; index++) {
      this.score = this.score + this.team1Player[index].run;
    }
    for (let index = 0; index < this.team2Player.length; index++) {
      this.totalWicket = this.totalWicket + this.team2Player[index].wicketTaken;
      this.extra = this.extra + this.team2Player[index].extra;
      this.over = this.over + this.team2Player[index].over;
    }
    this.overAllRR = (this.score / (this.over + this.leagalBall / 6)).toFixed(
      2
    );
    this.requiredRR = (
      (this.target - this.score) /
      (2 - this.over - this.leagalBall / 6)
    ).toFixed(2);
    if (this.innig == 'first') {
      if (this.over == 2) {
        debugger;
        alert(
          'First inning is completed please select new batsman and bowler.'
        );
        this.commentry.push(
          `First inning is completed. ${this.team1.name} has scored ${
            this.score
          } with loosing ${this.totalWicket} wickets. Now the target for ${
            this.team2.name
          } is ${this.score + 1}.`
        );
        this.service
          .addPartnership(this.currentPartnerShip)
          .subscribe((res) => {
            if (res) {
              this.currentPartnerShip = new PartnerShip();
              this.getPartnershipList();
            }
          });
        this.matchHistory.score1 = `${this.score}/${this.totalWicket}`;
        this.matchHistory.over1 = `${this.over}.${this.leagalBall}`;
        this.innig = 'second';
        this.isBowler = 'false';
        this.over = 0;
        this.isShow = false;
        this.target = this.score;
        this.score = 0;
        this.team3Id = localStorage.getItem('team1');
        this.team4Id = localStorage.getItem('team2');
        localStorage.setItem('team1', this.team4Id);
        localStorage.setItem('team2', this.team3Id);
        this.setMatch();
      }
    } else if (this.innig == 'second') {
      debugger;
      if (this.score > this.target) {
        alert(
          `${this.team1.name} has chased down the target of ${
            this.target
          } with ${10 - this.totalWicket} wicket remaining...!`
        );
        this.commentry.push(
          `${this.team1.name} has chased down the target of ${
            this.target + 1
          } with ${10 - this.totalWicket} wickets remaining.`
        );
        this.matchHistory.score2 = `${this.score}/${this.totalWicket}`;
        this.matchHistory.over2 = `${this.over}.${this.leagalBall}`;
        this.matchHistory.team1 = this.team1.name;
        this.matchHistory.team2 = this.team2.name;
        this.matchHistory.winner = this.team1.name;
        this.matchHistory.commentry = this.commentry;
        this.service.addMatch(this.matchHistory).subscribe((res) => {
          if (res) {
            this.reset();
          }
        });
      } else if (this.over == 2 && this.score < this.target) {
        alert(
          `${this.team2.name} has successfully defend the score of ${this.target}...!`
        );
        this.commentry.push(
          `${this.team2.name} has defend the score of ${
            this.target + 1
          } successfully and win by ${this.target - this.score} run.`
        );
        this.matchHistory.score2 = `${this.score}/${this.totalWicket}`;
        this.matchHistory.over2 = `${this.over}.${this.leagalBall}`;
        this.matchHistory.team1 = this.team1.name;
        this.matchHistory.team2 = this.team2.name;
        this.matchHistory.winner = this.team2.name;
        this.matchHistory.commentry = this.commentry;
        this.service.addMatch(this.matchHistory).subscribe((res) => {
          if (res) {
            this.reset();
          }
        });
      }
    }
  }
  editPlayer(i: any, p: Player) {
    this.service.editPlayer(i, p).subscribe((res) => {
      if (res) {
        this.setMatch();
        setTimeout(() => {
          this.calculate();
        }, 100);
      }
    });
  }
  editPlayer2(i: any, p: Player) {
    this.service.editPlayer(i, p).subscribe((res) => {
      if (res) {
        this.setMatch();
      }
    });
  }

  getTeamlist() {
    this.service.getTeamlist().subscribe((res) => {
      if (res) {
        this.teamList = res;
      }
    });
  }
  setMatch() {
    if (localStorage.getItem('team1') && localStorage.getItem('team2')) {
      this.isSet = true;
      this.service
        .getTeambyId(localStorage.getItem('team1'))
        .subscribe((res) => {
          if (res) {
            this.team1 = res;

            this.service.getPlayersbyTeam(res.name).subscribe((Res) => {
              if (Res) {
                this.team1Player = Res;
                this.team1Bowlers = Res.filter(
                  (item) => item.isBowler == 'yes'
                );
              }
            });
          }
        });
      this.service
        .getTeambyId(localStorage.getItem('team2'))
        .subscribe((res) => {
          if (res) {
            this.team2 = res;
            this.service.getPlayersbyTeam(res.name).subscribe((Res) => {
              if (Res) {
                this.team2Player = Res;
                this.team2Bowlers = Res.filter(
                  (item) => item.isBowler == 'yes'
                );
              }
            });
          }
        });
    } else {
      if (this.team1Id == this.team2Id) {
        this.team1Id = '';
        this.team2Id = '';
      } else {
        this.service.getTeambyId(this.team1Id).subscribe((res) => {
          if (res) {
            this.team1 = res;
            localStorage.setItem('team1', this.team1Id);
            this.isSet = true;
          }
        });
        this.service.getTeambyId(this.team2Id).subscribe((res) => {
          if (res) {
            this.team2 = res;
            localStorage.setItem('team2', this.team2Id);
            console.log('hello');
          }
        });
      }
    }
    // this.setMatch()
  }

  batsmanDone() {
    if (this.batsman1Id == this.batsman2Id) {
      alert('Selece diffrent batsmans.');
      this.batsman1Id = '';
      this.batsman2Id = '';
    } else {
      this.service.getPlayerbyId(this.batsman1Id).subscribe((res) => {
        this.batsMan1 = res;
        this.batsMan1.strike = 'yes';
        this.batsMan1.isOut = 'no';
        this.currentPartnerShip.player1 = res.name;
        this.service
          .editPlayer(this.batsMan1.id, this.batsMan1)
          .subscribe((Res) => {
            if (Res) {
              this.setMatch();
            }
          });
      });
      this.service.getPlayerbyId(this.batsman2Id).subscribe((res) => {
        this.batsMan2 = res;
        this.isBowler = 'true';
        this.batsMan2.isOut = 'no';
        this.currentPartnerShip.player2 = res.name;
        this.service
          .editPlayer(this.batsMan2.id, this.batsMan2)
          .subscribe((Res) => {
            if (Res) {
              this.setMatch();
            }
          });
      });
    }
    setTimeout(() => {
      this.commentry.push(
        `${this.batsMan1.name} and ${this.batsMan2.name} is on the crease, ${this.batsMan1.name} has strike.`
      );
    }, 100);
  }
  bowlerDone() {
    this.service.getPlayerbyId(this.bowlerId).subscribe((res) => {
      if (res) {
        this.bowler = res;
        this.isBowler = 'vivek';
        this.setMatch();
        this.commentry.push(
          `${this.bowler.name} has ball on his hand and will start the inning.`
        );
      }
    });
  }

  zero() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '0';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.addCommentry('0 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
        }
      } else {
        this.batsMan2.ball++;
        this.addCommentry('0 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2run--;
        }
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.strike = '';
          this.batsMan1.strike = 'yes';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  one() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '1';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.runGiven++;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run++;
        this.addCommentry('1 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run++;
        this.currentPartnerShip.player1run++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
          this.currentPartnerShip.run--;
          this.currentPartnerShip.player1run--;
        }
        this.batsMan1.strike = '';
        this.batsMan2.strike = 'yes';
      } else {
        this.batsMan2.ball++;
        this.batsMan2.run++;
        this.addCommentry('1 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run++;
        this.currentPartnerShip.player2run++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.run--;
          this.currentPartnerShip.player2run--;
        }
        this.batsMan2.strike = '';
        this.batsMan1.strike = 'yes';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 1;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan2.ball--;
          this.batsMan2.run--;
          this.batsMan1.strike = 'yes';
        } else {
          this.batsMan1.ball--;
          this.batsMan1.run--;
          this.batsMan2.strike = 'yes';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  two() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '2';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 2;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run + 2;
        this.addCommentry('2 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 2;
        this.currentPartnerShip.player1run =
          this.currentPartnerShip.player1run + 2;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball;
          this.currentPartnerShip.player1ball;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 2;
          this.currentPartnerShip.player1run =
            this.currentPartnerShip.player1run - 2;
        }
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      } else {
        this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run + 2;
        this.addCommentry('2 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 2;
        this.currentPartnerShip.player2run =
          this.currentPartnerShip.player2run + 2;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 2;
          this.currentPartnerShip.player2run =
            this.currentPartnerShip.player2run - 2;
        }
        this.batsMan2.strike = 'yes';
        this.batsMan1.strike = '';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 2;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 2;
          this.batsMan2.strike = 'yes';
          this.batsMan1.strike = '';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 2;
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  three() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '3';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 3;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run + 3;
        this.addCommentry('3 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 3;
        this.currentPartnerShip.player1run =
          this.currentPartnerShip.player1run + 3;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 3;
          this.currentPartnerShip.player1run =
            this.currentPartnerShip.player1run - 3;
        }
        this.batsMan1.strike = '';
        this.batsMan2.strike = 'yes';
      } else {
        this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run + 3;
        this.addCommentry('3 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 3;
        this.currentPartnerShip.player2run =
          this.currentPartnerShip.player2run + 3;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 3;
          this.currentPartnerShip.player2run =
            this.currentPartnerShip.player2run - 3;
        }
        this.batsMan2.strike = '';
        this.batsMan1.strike = 'yes';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 3;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 3;
          this.batsMan1.strike = 'yes';
        } else {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 3;
          this.batsMan2.strike = 'yes';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  four() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '4';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 4;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run + 4;
        this.addCommentry('4 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 4;
        this.currentPartnerShip.player1run =
          this.currentPartnerShip.player1run + 4;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
          this.currentPartnerShip.player1run =
            this.currentPartnerShip.player1run - 4;
        }
        this.batsMan1.fours++;
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      } else {
        this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run + 4;
        this.addCommentry('4 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 4;
        this.currentPartnerShip.player2run =
          this.currentPartnerShip.player2run + 4;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 4;
          this.currentPartnerShip.player2run =
            this.currentPartnerShip.player2run - 4;
        }
        this.batsMan2.fours++;
        this.batsMan2.strike = 'yes';
        this.batsMan1.strike = '';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 4;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 4;
          this.batsMan1.fours--;
          this.batsMan2.strike = 'yes';
          this.batsMan1.strike = '';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 4;
          this.batsMan2.fours--;
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  six() {
    if (this.leagalBall < 7) {
      this.contArr[this.ball] = '6';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 6;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run + 6;
        this.addCommentry('6 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 6;
        this.currentPartnerShip.player1run =
          this.currentPartnerShip.player1run + 6;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
          this.currentPartnerShip.run = this.currentPartnerShip.run - 6;
          this.currentPartnerShip.player1run =
            this.currentPartnerShip.player1run - 6;
        }
        this.batsMan1.sixes++;
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      } else {
        this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run + 6;
        this.addCommentry('6 run.');
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run = this.currentPartnerShip.run + 6;
        this.currentPartnerShip.player2run =
          this.currentPartnerShip.player2run + 6;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.player2run =
            this.currentPartnerShip.player2run - 6;
        }
        this.batsMan2.strike = 'yes';
        this.batsMan2.sixes++;
        this.batsMan1.strike = '';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 6;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 6;
          this.batsMan1.sixes--;
          this.batsMan2.strike = 'yes';
          this.batsMan1.strike = '';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 6;
          this.batsMan2.sixes--;
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }
    this.calculate1();
  }
  wide() {
    this.isNoball = true
    if (this.leagalBall < 6) {
      this.contArr.push('');
      this.contArr[this.ball] = 'WD';
      this.ball++;
      // this.leagalBall++;
      // this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 1;
      this.bowler.extra++;
      if (this.batsMan1.strike) {
        // this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run + 0;
        this.addCommentry('wide & 0 run.');
        this.currentPartnerShip.run++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.run--;
        }
        // this.batsMan1.sixes++;
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      } else {
        // this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run + 0;
        this.addCommentry('wide & 0 run.');
        this.currentPartnerShip.run++;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.run--;
        }
        // this.batsMan2.sixes++;
        this.batsMan2.strike = 'yes';
        this.batsMan1.strike = '';
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 1;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 0;
          this.batsMan1.sixes--;
          this.batsMan2.strike = '';
          this.batsMan1.strike = 'yes';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 0;
          this.batsMan2.sixes--;
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
        }
      }
    } else if (this.leagalBall == 6 || this.bowler.overBall > 6) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
      if (this.batsMan1.strike) {
        this.batsMan1.strike = '';
        this.batsMan2.strike = 'yes';
      } else {
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      }
    }
    this.calculate1();
  }
  noBall() {
    this.isShow2 = true;
  }
  noBall2() {
    this.isNoball = true
    if (this.leagalBall < 6) {
      this.contArr.push('');
      this.contArr[this.ball] = 'NB' + this.noBallRun;
      this.ball++;
      // this.leagalBall++;
      // this.bowler.overBall++;
      this.bowler.runGiven = this.bowler.runGiven + 1 + this.noBallRun * 1;
      this.bowler.extra++;
      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.run = this.batsMan1.run * 1 + this.noBallRun * 1;
        this.addCommentry(`No Ball & ${this.noBallRun} run.`);
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player1ball++;
        this.currentPartnerShip.run =
          this.currentPartnerShip.run + this.noBallRun * 1 + 1 * 1;
        this.currentPartnerShip.player1run =
          this.currentPartnerShip.player1run + this.noBallRun * 1 + 1 * 1;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player1ball--;
          this.currentPartnerShip.run =
            this.currentPartnerShip.run - this.noBallRun * 1 - 1 * 1;
          this.currentPartnerShip.player1run =
            this.currentPartnerShip.player1run - this.noBallRun * 1 - 1 * 1;
        }
        if (this.noBallRun == 0 || this.noBallRun == 2) {
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        } else if (this.noBallRun == 1) {
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
        } else if (this.noBallRun == 4) {
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
          this.batsMan1.fours++;
        } else if (this.noBallRun == 6) {
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
          this.batsMan1.sixes++;
        }
      } else {
        debugger;
        this.batsMan2.ball++;
        this.batsMan2.run = this.batsMan2.run * 1 + this.noBallRun * 1;
        this.addCommentry(`No Ball & ${this.noBallRun} run.`);
        this.currentPartnerShip.ball++;
        this.currentPartnerShip.player2ball++;
        this.currentPartnerShip.run =
          this.currentPartnerShip.run + this.noBallRun * 1 + 1 * 1;
        this.currentPartnerShip.player2run =
          this.currentPartnerShip.player2run + this.noBallRun * 1 + 1 * 1;
        if (this.leagalBall == 7) {
          this.commentry.pop();
          this.currentPartnerShip.ball--;
          this.currentPartnerShip.player2ball--;
          this.currentPartnerShip.run =
            this.currentPartnerShip.run - this.noBallRun * 1 - 1 * 1;
          this.currentPartnerShip.player2run =
            this.currentPartnerShip.player2run - this.noBallRun * 1 - 1 * 1;
        }
        if (this.noBallRun == 0 || this.noBallRun == 2) {
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
        } else if (this.noBallRun == 1) {
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        } else if (this.noBallRun == 4) {
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
          this.batsMan2.fours++;
        } else if (this.noBallRun == 6) {
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
          this.batsMan2.sixes++;
        }
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 1;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 0;
          this.batsMan1.sixes--;
          this.batsMan2.strike = '';
          this.batsMan1.strike = 'yes';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 0;
          this.batsMan2.sixes--;
          this.batsMan1.strike = '';
          this.batsMan2.strike = 'yes';
        }
      }
    } else if (this.leagalBall == 6 || this.bowler.overBall > 6) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
      if (this.batsMan1.strike) {
        this.batsMan1.strike = '';
        this.batsMan2.strike = 'yes';
      } else {
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
      }
    }
    this.isShow2 = false;
    this.calculate1();
  }

  out() {
    this.isShow3 = true;
  }
  out2() {
    if (this.leagalBall < 7) {
      debugger;
      this.contArr[this.ball] = 'W';
      this.ball++;
      this.leagalBall++;
      this.bowler.overBall++;
      this.bowler.wicketTaken = this.bowler.wicketTaken + 1;

      if (this.batsMan1.strike) {
        this.batsMan1.ball++;
        this.batsMan1.isOut = 'yes';
        this.batsMan1.strike = 'yes';
        this.batsMan2.strike = '';
        if (this.catchBy) {
          this.batsMan1.catchBy = this.catchBy;
          this.batsMan1.outBy = this.bowler.name;
          this.addCommentry(
            `Catch Out. C. ${this.catchBy} B. ${this.bowler.name}.`
          );
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player1ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
          }
        } else if (this.runOutby) {
          this.batsMan1.runOutBy = this.runOutby;
          this.addCommentry(`Run Out by ${this.runOutby}.`);
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player1ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
            this.currentPartnerShip.ball--;
          }
        } else {
          this.batsMan1.outBy = this.bowler.name;
          this.addCommentry(`Out. B. ${this.bowler.name}.`);
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player1ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
          }
        }
      } else {
        this.batsMan2.ball++;
        this.batsMan2.isOut = 'yes';
        this.batsMan2.strike = 'yes';
        this.batsMan1.strike = '';
        if (this.catchBy) {
          this.batsMan2.catchBy = this.catchBy;
          this.batsMan2.outBy = this.bowler.name;
          this.addCommentry(
            `Catch Out. C. ${this.catchBy} B. ${this.bowler.name}.`
          );
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player2ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
          }
        } else if (this.runOutby) {
          this.batsMan2.runOutBy = this.runOutby;
          this.addCommentry(`Run Out by ${this.runOutby}.`);
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player2ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
          }
        } else {
          this.batsMan2.outBy = this.bowler.name;
          this.addCommentry(`Out. B. ${this.bowler.name}.`);
          this.currentPartnerShip.ball++;
          this.currentPartnerShip.player2ball++;
          this.currentPartnerShip.player1 = this.batsMan1.name;
          this.currentPartnerShip.player2 = this.batsMan2.name;
          this.service
            .addPartnership(this.currentPartnerShip)
            .subscribe((res) => {
              if (res) {
                this.currentPartnerShip = new PartnerShip();
                this.currentPartnerShip.player1 = this.batsMan1.name;
                this.currentPartnerShip.player2 = this.batsMan2.name;
                this.getPartnershipList();
              }
            });
          if (this.leagalBall == 7) {
            this.commentry.pop();
          }
        }
      }
      if (this.bowler.overBall == 7) {
        this.bowler.over++;
        this.bowler.runGiven = this.bowler.runGiven - 0;
        this.isShow = true;
        this.ball = 0;
        this.leagalBall = 0;
        console.log('hii');
        this.contArr = ['', '', '', '', '', ''];
        this.bowler.overBall = 0;
        if (this.batsMan1.strike) {
          this.batsMan1.ball--;
          this.batsMan1.run = this.batsMan1.run - 0;
          this.batsMan1.sixes--;
          this.batsMan2.strike = 'yes';
          this.batsMan1.strike = '';
        } else {
          this.batsMan2.ball--;
          this.batsMan2.run = this.batsMan2.run - 0;
          this.batsMan2.sixes--;
          this.batsMan1.strike = 'yes';
          this.batsMan2.strike = '';
        }
      }
    } else if (this.leagalBall == 7 || this.bowler.overBall > 7) {
      this.isShow = true;
      this.ball = 0;
      this.leagalBall = 0;
      console.log('hii');
      this.contArr = ['', '', '', '', '', ''];
    }

    this.service.getPlayerbyId(this.batsman3Id).subscribe((res) => {
      debugger;
      if (res) {
        if (this.batsMan1.strike) {
          console.log(this.batsMan2);
          this.batsMan1 = res;
          this.batsMan1.isOut = 'no';
          this.commentry.push(
            `${this.batsMan1.name}, ${this.batsMan1.role}, comes to the crease.`
          );
        } else {
          console.log(this.batsMan2);
          this.batsMan2 = res;
          this.batsMan2.isOut = 'no';
          this.commentry.push(
            `${this.batsMan2.name}, ${this.batsMan2.role}, comes to the crease.`
          );
        }
      }
    });
    this.isShow3 = false;
    this.calculate1();
  }

  newBowler() {
    if (this.newBowlerId == this.bowlerId) {
      alert('Select another bowler');
    } else {
      this.service.getPlayerbyId(this.newBowlerId).subscribe((res) => {
        if (res) {
          this.commentry.push(
            `${res.name}, ${res.role2}, comes into the attack, replace ${this.bowler.name}.`
          );
          this.bowler = res;
          this.bowlerId = this.newBowlerId;
          this.newBowlerId = '';
          this.isShow = false;
        }
      });
    }
  }
}

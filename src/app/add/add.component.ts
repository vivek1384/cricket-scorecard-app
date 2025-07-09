import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Player, Team } from '../app.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add',
  imports: [RouterLink, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  ngOnInit(): void {
    this.getTeamList()
  }
  player : Player = new Player()
  teamList : Team[] = []

  service = inject(ServiceService)

  addPlayer(){
    this.service.addPlayer(this.player).subscribe((res)=>{
      if(res){
        alert("Player added successfully!")
        this.player = new Player()
      }
    })
  }

  getTeamList(){
    this.service.getTeamlist().subscribe((res)=>{
      if(res){
        this.teamList = res;
      }
    })
  }

}

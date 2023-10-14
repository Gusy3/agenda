import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ContactService]
})
export class HomeComponent implements OnInit {

  public page: number = 1;
  public cumpleanyeros: any[];

  constructor(
    private _contactService: ContactService
  ) {
    this.cumpleanyeros = [];
  }

  ngOnInit(): void {

    this._contactService.getCumpleanyeros().subscribe(
      response=>{

        this.cumpleanyeros = response.cumpleanyeros;

      },
      error=>{

        console.log(error);

      }
    );
    
  }

}

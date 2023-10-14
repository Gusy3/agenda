import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ContactService]
})
export class SearchComponent implements OnInit {

  public nombre!: string;
  public apellidos!: string;
  public contacts!: Contact[];
  public page: number = 1;

  constructor(
    private _contactService: ContactService,
    private _route: ActivatedRoute
  ){}

  getContactsBySearch(){

    this._route.queryParams.subscribe(
      
      params=>{

        this._contactService.search(params).subscribe(

          response=>{
          
            if(response.contacts){

              this.page= 1;
              this.contacts= response.contacts;

            }else{

              this.contacts= [];

            }

          },
          error=>{

            console.log(error);
            this.contacts= [];

          }
        );

      }
      
    );

  }

  ngOnInit(): void {

    this.getContactsBySearch();

  }

}

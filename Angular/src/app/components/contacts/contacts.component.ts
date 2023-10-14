import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  public page: number = 1;
  public contacts: Contact[];

  constructor(
    private _contactService: ContactService
  ){
    this.contacts = [];
  }

  ngOnInit(): void {

    this._contactService.getContacts().subscribe(
      response=>{

        this.contacts= response.contacts;

      },
      error=>{

        console.log(error);

      }
    );

  }

}

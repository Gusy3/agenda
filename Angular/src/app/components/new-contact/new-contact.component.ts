import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ProvinceService } from 'src/app/services/province.service';
import { Router} from '@angular/router';
import { Contact } from '../../models/contact';
import { Province } from '../../models/province';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css'],
  providers: [ContactService, ProvinceService]
})
export class NewContactComponent implements OnInit {

  public page_title: String;
  public today: Date;
  public contact: Contact;
  public provinces: Province[];

  constructor(
    private _contactService: ContactService,
    private _provinceService: ProvinceService,
    private _router: Router,
  ){
    this.page_title = "Nuevo Contacto";
    this.today = new Date();
    this.contact= new Contact('', '', '', 0, '', '', 0, '', '', new Date());
    this.provinces = [];
  }

  ngOnInit(): void {

    this.getProvinces();

  }

  getProvinces(){

    this._provinceService.getProvinces().subscribe(

      response=>{

        if (response.provinces){

          this.provinces = response.provinces;

        }

      },
      error=>{

        console.log(error);

      }

    );

  }

  onSubmit(){

    this._contactService.create(this.contact).subscribe(
      
      response=>{

        if (response.contact){

          this.contact = response.contact;
          this._router.navigate(["contactos"]);

        }

      },
      error=>{

        console.log(error);

      }

    );

  }

}

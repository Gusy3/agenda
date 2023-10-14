import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ProvinceService } from 'src/app/services/province.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Province } from '../../models/province';

@Component({
  selector: 'app-edit-contact',
  templateUrl: '../new-contact/new-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
  providers: [ContactService, ProvinceService]
})
export class EditContactComponent implements OnInit {

  public page_title: String;
  public today: Date;
  public contact: Contact;
  public provinces: Province[];

  constructor(
    private _contactService: ContactService,
    private _provinceService: ProvinceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.page_title = "Editar Contacto";
    this.today = new Date();
    this.contact= new Contact('', '', '', 0, '', '', 0, '', '', new Date());
    this.provinces = [];
  }

  ngOnInit(): void {

    this.getProvinces();
    this.getContact();

  }

  getContact(){

    this._route.params.subscribe(params=>{

      let id = params['id'];

      this._contactService.getContact(id).subscribe(
        response=>{
          
          if (response.contact){

            this.contact = response.contact;

          }
  
        },
        error=>{
  
          console.log(error);
  
        }
      );

    });

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

    this._contactService.update(this.contact._id, this.contact).subscribe(
      
      response=>{

        if (response.contact){

          this.contact = response.contact;
          this._router.navigate(["contacto/"+this.contact._id]);

        }

      },
      error=>{

        console.log(error);

      }

    );

  }

  updateDate(event: any){

    this.contact.f_nacimiento = new Date(event);
  }

}

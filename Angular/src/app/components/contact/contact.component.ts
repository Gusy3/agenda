import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import swal from 'sweetalert';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})

export class ContactComponent implements OnInit {

  public contact!: Contact;

  constructor(
    private _contactService: ContactService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
  }

  ngOnInit(): void {

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

  delete(contactId: String){

    swal({
      title: "¿Estás seguro de borrar el contacto?",
      text: "¡Una vez borrado no podrás recuperarlo!",
      buttons: [true, true],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete){

        this._contactService.delete(contactId).subscribe(

          response=>{
    
            swal("¡El contacto ha sido borrado correctamente!", {
              icon: "success",
            });

            this.contact = response.contact;
            this._router.navigate(["contactos"]);
    
          },
          error=>{
    
            console.log(error);
            this._router.navigate(["contactos"]);
            
          }
        );

      } else {
        swal("¡Tranquilo nada se ha borrado!");
      }
    });


  }

}

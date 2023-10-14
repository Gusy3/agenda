import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Contact } from "../models/contact";

@Injectable()
export class ContactService{

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getCumpleanyeros():Observable<any>{

        return this._http.get(this.url+"birthdays");

    }

    getContacts():Observable<any>{

        return this._http.get(this.url+"contacts");

    }

    getContact(contactId: String):Observable<any>{

        return this._http.get(this.url+"contact/"+contactId);

    }

    create(contact: Contact):Observable<any>{

        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+"save/", params, {headers: headers});

    }

    update(contactId: String, contact: Contact):Observable<any>{

        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+"contact/"+contactId, params, {headers: headers});

    }

    delete(contactId: String):Observable<any>{

        return this._http.delete(this.url+"contact/"+contactId);

    }

    search(params: any):Observable<any>{

        if(params.nombre && params.apellidos){

            return this._http.get(this.url+"search?nombre=" + params.nombre + "&apellidos=" + params.apellidos);

        }else if(params.nombre){

            return this._http.get(this.url+"search?nombre=" + params.nombre);

        }else{

            return this._http.get(this.url+"search?apellidos=" + params.apellidos);

        }

    }

}
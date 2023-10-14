import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  public searchNombre!: string;
  public searchApellidos!: string;

  constructor(
    private _router: Router
  ){}

  ngOnInit(): void {
  }

  goSearch(){

    if(this.searchNombre && this.searchApellidos){

      this._router.navigate(['/buscar'], {queryParams: {nombre: this.searchNombre, apellidos: this.searchApellidos}});
      
    }else if(this.searchNombre){

      this._router.navigate(['/buscar'], {queryParams: {nombre: this.searchNombre}});

    }else if(this.searchApellidos){

      this._router.navigate(['/buscar'], {queryParams: {apellidos: this.searchApellidos}});

    }

  }

}

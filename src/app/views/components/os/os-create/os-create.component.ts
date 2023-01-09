import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { OS } from 'src/app/model/os';
import { Tecnico } from 'src/app/model/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarCliente();
  }

  create(): void{
     this.service.create(this.os).subscribe(resp => {
      this.service.message(["Ordem de Serviço criada com sucesso!"]);
      this.router.navigate(['os'])
     })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }


  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resp => {
      this.tecnicos = resp;
    })
  }

  listarCliente():void {
    this.clienteService.findAll().subscribe(resp => {
      this.clientes = resp;
    })
  }

}

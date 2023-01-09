import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(){
    this.service.findById(this.id_tec).subscribe(resp => {
      this.cliente = resp;
    })
  }

  delete() {
    this.service.delete(this.id_tec).subscribe(resp => {
      this.router.navigate(['clientes'])
      this.service.message(['Técnico deletado com sucesso!'])
    }, err => {
      const newMsg = err.error.errors?.map(mensagem)
      function mensagem(item: {
        message: any; "": any;
      }) {
        return ['  ' + item.message];
      }

      if (newMsg === undefined) {
        this.service.message([err.error.error]);
      } else {

        console.log('teste: ' + newMsg);
        this.service.message(newMsg);
      }
      console.log(err);

    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

}

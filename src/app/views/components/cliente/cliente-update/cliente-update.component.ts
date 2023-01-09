import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])


  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void{
    this.service.findById(this.id_cli).subscribe(resp => {
      this.cliente = resp;
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  update(): void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']);
      this.service.message(['Cliente atualizado com sucesso!']);
    }, err => {
      // if (err.error.error.match('já cadastrado')) {
      //   this.service.message(err.error.error)
      // }
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
    }

    )
  }


  errorValidName(){
    if(this.nome.invalid){
      return 'O nome deve ter entre 5 caracteres ate 100!';
    }
    return false;
  }

  errorValidCpf(){
    if(this.cpf.invalid){
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errorValiTelefone(){
    if(this.telefone.invalid){
      return 'O telefone deve ter entre 11 e 18!';
    }
    return false;
  }

}
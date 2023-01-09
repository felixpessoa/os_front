import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Tecnico } from 'src/app/model/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(){
    this.service.findById(this.id_tec).subscribe(resp => {
      this.tecnico = resp;
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(resp => {
      this.router.navigate(['tecnicos'])
      this.service.message(['Tecnico atualuzado com suvesso!']);
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

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

}

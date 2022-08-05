import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/model/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])
  form: FormGroup;


  constructor(
    private router: Router,
    private service: TecnicoService,
    private formBuild: FormBuilder
  ) {
    this.form = this.formBuild.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    },);
    
   }


  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']);
      this.service.message(['Técnico criado com sucesso!']);
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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/model/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

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

  delete() {
    this.service.delete(this.id_tec).subscribe(resp => {
      this.router.navigate(['tecnicos'])
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
    this.router.navigate(['tecnicos'])
  }

}

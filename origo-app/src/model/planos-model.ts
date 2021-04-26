export class Plano {

    plano!: string;
    mensalidade!: number;
    id?: any;
  


  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.plano = obj.plano;
    this.mensalidade = obj.mensalidade;
  }


}

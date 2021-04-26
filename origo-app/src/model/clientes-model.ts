
export class Cliente {
    id?: any;
    nome!: string;
    email!:string;
    telefone!:string;
    estado!:string;
    cidade!:string;
    nascimento!:string;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
    
        this.id = obj.id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.estado = obj.estado;
        this.cidade = obj.cidade;
        this.nascimento = obj.nascimento;
      }

}

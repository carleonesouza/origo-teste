export class PlanoClinte {
    id?: any;
    planoID!: number;
    clienteID!:number;
    

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
    
        this.id = obj.id;
        this.planoID = obj.planoID;
        this.clienteID = obj.clienteID;
      }

}
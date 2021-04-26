export class Usuario {
    _id?: any;
    name!: string;
    email!:string;
    password!:string;

    constructor(obj?: any) {
        if (!obj) {
          return;
        }
    
        this._id = obj._id;
        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
      }

}

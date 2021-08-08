export class ErrorModel{
    id: number | undefined;
    message: string; 

    constructor(message: string, id?: number){
        this.id = id;
        this.message = message;
    }
}
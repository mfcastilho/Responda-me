

export class Survey{
     private id: string;
     private title: string;
     private deadLine: Date;
     private userId: string;

     constructor(id:string, title:string, deadline:Date, userId:string){
          this.id = id;
          this.title = title;
          this.deadLine = deadline;
          this.userId = userId;
     }


     /* -- Getters  -- */

     public getId():string{
          return this.id;
     }

     public getTitle():string{
          return this.title;
     }

     public getDeadLine():Date{
          return this.deadLine;
     }

     public getUserId():string{
          return this.userId;
     }

     /* -- Setters  -- */
     public setId(id:string){
          this.id = id;
     }

     public setTitle(title:string){
          this.title = title;
     }

     public setDeadLine(deadLine:Date){
          this.deadLine = deadLine;
     }

     public setUserId(userId:string){
          this.userId = userId;
     }


}
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthAdminGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();

    console.log("[GUARD]: ", request.user);

    if (request['user']?.role === 'admin') {
      return true; // true seguir o fluxo
    }
   
    return false; 
  }
}
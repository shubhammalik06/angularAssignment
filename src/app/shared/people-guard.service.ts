import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FormService } from './form.service';
import { Injectable } from '@angular/core';

@Injectable()
export class peopleGuardService implements CanActivate {
	constructor(public service: FormService, private router ){}
	
	canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
        const exp = false;

        if(exp){
            return true;
        }else{
            this.router.navigate('notfound');
            return false;
        }
        
	} 
}
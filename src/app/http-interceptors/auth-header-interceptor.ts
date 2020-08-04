import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';

import { catchError, tap, finalize } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const started = Date.now();
let ok: string;


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const authReq = request.clone({
            //    headers : request.headers.set('Access-Control-Allow-Origin', '*') 
            setHeaders: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin' : '*'
                
                // "Access-Control-Allow-Credentials : true"
                // "Access-Control-Allow-Methods": "PUT, GET, POST, OPTIONS",
                // "Access-Control-Allow-Headers" : "Special-Request-Header"
            },

        });

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 200) {
                    // 401 handled in auth.interceptor
                    console.log("Error reason : " + error.message);
                }
                return throwError(error);
            })
            // tap(
            //     (event: HttpEvent<any>) => ok = event instanceof HttpResponse ? 'succeeded' : '',
            //     (error: HttpErrorResponse) => ok = "failed"
            // ),
            // // Log when response observable either completes or errors
            // finalize(() => {
            //     const elapsed = Date.now() - started;
            //     const msg = `${authReq.method} "${authReq.urlWithParams}" ${ok} in ${elapsed} ms.`;
            //     console.log(msg);
            // })
        );
    }

}

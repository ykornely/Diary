import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserAndParagraphService } from "../shared/user-and-paragraph.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserAndParagraphService,private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth')) { // for those requests which don't need jwt (authorization) like login and sign-up. (We have to give these requests noauth property in user.service.ts)
            return next.handle(req.clone());
        }
        else {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}

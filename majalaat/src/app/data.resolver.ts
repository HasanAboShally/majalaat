import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs/operators";
import { BackendService } from "./backend.service";




@Injectable({ providedIn: 'root' })

export class DataResolver implements Resolve<any> {

    constructor(private backend: BackendService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.backend.ready().pipe(
            take(1),
            map((isReady: boolean) => isReady));
    }
}

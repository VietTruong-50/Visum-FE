import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export class CustomRouteReuseStrategy extends RouteReuseStrategy {
    public shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
    public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
    public shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return false; }
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return (future.routeConfig === curr.routeConfig) || future.data["reuse"];
    }
}
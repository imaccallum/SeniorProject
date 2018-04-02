// import { CanActivate } from '@angular/router';

// import { UserService } from '@services/index'

// @Injectable()
// class CanEditArticle implements CanActivate {
//   constructor(private userService: UserService) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean>|Promise<boolean>|boolean {
//   	const { articleId } = route.params

//   	if (!articleId) {
//   		return false
//   	}

  	

//     return this.permissions.canActivate(this.currentUser, route.params.id);
//   }
// }

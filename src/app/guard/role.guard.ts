// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../service/auth.service';
// import { ApiRoleService } from '../service/role.service';
// import { inject } from '@angular/core';

// export const roleGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const roleService = inject(ApiRoleService);

//   const token = localStorage.getItem('Token');

//   if (token) {
//     const expectedRole = route.data['role'] as string;

//     const userId = authService.getUserIdFromToken(token);

//     // Panggil API untuk mendapatkan role user dan bandingkan dengan role yang diharapkan
//     return roleService.getRole(userId).pipe(
//       map(roleResponse => {
//         if (roleResponse.role === expectedRole) {
//           return true;
//         } else {
//           router.navigateByUrl('/unauthorized');
//           return false;
//         }
//       })
//     );
//   } else {
//     router.navigateByUrl('/login');
//     return false;
//   }
// };

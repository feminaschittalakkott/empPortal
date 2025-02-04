import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const toaster = inject(ToastrService)
  const router = inject(Router)

  if(sessionStorage.getItem('username')){
    return true;
  }
  else{
    toaster.warning("Please login first!")
    router.navigateByUrl('')
    return false;
  }
};

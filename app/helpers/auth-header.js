import { authenticationService } from '@/services';

export function authHeader() {
    //const [{currentUser}, dispatch] = useAppState();
    const currentUser = authenticationService.currentUserValue;
      // return authorization header with jwt token

    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
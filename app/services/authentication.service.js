import { BehaviorSubject } from 'rxjs';
import config from '@/config';
import { handleResponse } from '@/helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    forgotPassowrd,
    resetPassowrd,
    authToken
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //credentials: 'include',
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function forgotPassowrd(userEmail) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail }),
    };
  
    return fetch(`${config.apiUrl}/users/forgot`, requestOptions)
    .then(handleResponse)
    .then((data) => {
        return data;
    });
}
  
function resetPassowrd(userEmail, newPassword) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, newPassword }),
      };
      
      return fetch(`${config.apiUrl}/users/reset/:token`, requestOptions)
      .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function authToken(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/users/authToken?${query}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}
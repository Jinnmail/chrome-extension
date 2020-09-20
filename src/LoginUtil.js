import React from 'react';

class loginUtil {
  loggedIn = () => {
    if (localStorage.getItem('jinnmailToken')) {
      const jinnmailToken = localStorage.getItem('jinnmailToken');
      const jinnmailTokenExp = JSON.parse(atob(jinnmailToken.split('.')[1])).exp;
      if (Date.now() < jinnmailTokenExp * 1000) {
        console.log(true)
        return true;
      } else {
        console.log(false)
        return false;
      }
    }
  }

  logOut = () => {
    localStorage.removeItem('jinnmailToken');
  }

  // userId = () => {
  //   const userId = JSON.parse(atob(localStorage.getItem("jinnmailToken").split('.')[1])).userId

  //   return userId;
  // }
}

export const LoginUtil = new loginUtil(); 
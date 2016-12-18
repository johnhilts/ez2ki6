import React from 'react';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);

export const authenticateByEmailAndPassword = (email, password, onSuccess) => {
  base.authWithPassword({
    email    : email,
    password : password,
  }, onSuccess);
}

export const fetchUserInfo = (reactContext, uid, onSuccess) => {
  base.fetch(db.getUserRoot(uid), { // NOTE: Firebase's security rules prevent a user from accessing someone else's data
  context : reactContext,
    then(user) {
      onSuccess(user);
    },
  });
}

export const firebaseConfig = {
  apiKey: 'AIzaSyDIoxipbDfUyTsZT_mCj-lShyNOfh_2ROg',
  authDomain: 'easynikkiroku.firebaseapp.com',
  databaseURL: 'https://easynikkiroku.firebaseio.com',
  storageBucket: '',
};

export function getUserRoot(owner) {
  return 'users/' + owner;
}

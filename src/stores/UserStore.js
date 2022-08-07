import { Store } from 'pullstate';

export const UserStore = new Store({
  isOnline: true,
  userInfo: {},
  token: '',
  userData: [],
});

export default class UserInfo {
  constructor({ nameSelector, memoSelector }) {
    this._nameSelector = nameSelector;
    this._memoSelector = memoSelector;
    this._name = document.querySelector(this._nameSelector);
    this._memo = document.querySelector(this._memoSelector);
  }
  getUserInfo() {
    const name = this._name.textContent;
    const memo = this._memo.textContent;
    return { name, memo };
  }
  setUserInfo({name,memo}) {
    this._name.textContent = name;
    this._memo.textContent = memo;
  }
}

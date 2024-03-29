export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.link,
    };
  }
  
  setUserInfo(newName, newInfo, newAvatar, _id) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
    this._avatar.src = newAvatar;
    this.userId = _id;
  }
}

const profileEdit = document.querySelector('.profile__edit');


profileEdit.addEventListener('click', function() {
  const popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
});

const popupButtonClose = document.querySelector('.popup__button-close');


popupButtonClose.addEventListener('click', function() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
});
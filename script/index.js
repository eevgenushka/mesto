const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupForm = document.querySelector('.popup__form');
const popupButtonClose = document.querySelector('.popup__button-close');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeJob= document.querySelector('.popup__input_type_job');
const popup = document.querySelector('.popup');

function handleFormClick (evt) {
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeJob.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
};
profileEdit.addEventListener('click', handleFormClick);


function handleFormCloseClick (evt) {
  popup.classList.remove('popup_opened');
};
popupButtonClose.addEventListener('click', handleFormCloseClick);


function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeJob.value;
  popup.classList.remove('popup_opened');
}
popupForm.addEventListener('submit', handleFormSubmit);
const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupFormTypeProfile = document.querySelector('.popup__form_type_profile');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeJob= document.querySelector('.popup__input_type_job');
const popupTypeProfile= document.querySelector('.popup_type_profile');

const popupButtonClose = document.querySelectorAll('.popup__button-close');
const popupButton = document.querySelectorAll('.popup');

const popupFormTypePlace = document.querySelector('.popup__form_type_place');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypePlace = document.querySelector('.popup_type_place');  
const popupFormPlace = document.querySelector('.popup__form_place'); 
const popupInputTypePlace = document.querySelector('.popup__input_type_place'); 
const popupInputTypeLink = document.querySelector('.popup__input_type_link'); 

const popupTypePicture = document.querySelector('.popup_type_picture');
const popupPicture = document.querySelector('.popup__picture');                          
const popupName = document.querySelector('.popup__name');   

const cardsContainer = document.querySelector('.elements'); 
const cardTemplate = document.querySelector('#elements-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt:   'Холмы в Архызе'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt:   'Озеро в снегу '
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt:   'Вид на панельные дома в Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt:   'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt:   'Железная дорога'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt:   'Заснеженный байкал'
  }
]; 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPopup);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPopup);
};

const handleEscPopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupClose = document.querySelector('.popup_opened');
    closePopup(popupClose);
  };
};


function openTypeProfile() {
  openPopup(popupTypeProfile);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeJob.value = profileAbout.textContent;
};

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeJob.value;
  closePopup(popupTypeProfile);
};

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);;
  const cardName = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__item');
  const cardDeleteButton = cardElement.querySelector('.element__basket');
  const cardlikeButtons = cardElement.querySelector('.element__button');

  cardName.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.link);  

  cardDeleteButton.addEventListener('click',deleteButtonsClick);
  cardlikeButtons.addEventListener('click',likeButtonsClick);
  cardImage.addEventListener('click',openPopupPictures);
  
  cardsContainer.prepend(cardElement);
  
  return cardElement;
};

initialCards.forEach(createCard);

function likeButtonsClick(evt) {
  const button = evt.target;
  const like = button.closest('.element__button');
  like.classList.toggle('element__button_active');
};

function deleteButtonsClick(evt) {
  const button = evt.target;
  const card = button.closest('.element');
  card.remove()
};

function openPopupPictures (evt) {  
 openPopup(popupTypePicture);
 const imageSrc = evt.target.getAttribute('src');
 const imageAlt = evt.target.getAttribute('alt');
 const card = evt.target.closest('.element');
 const imageTitle = card.querySelector('.element__title').textContent;
 popupPicture.src = imageSrc;
 popupPicture.alt = imageAlt;
 popupName.textContent = imageTitle;
};

const renderInitialCards  = (card) => {
  cardsContainer.prepend(createCard(card));
};

function addCard(evt) {
  evt.preventDefault();
  renderInitialCards ({
    name: popupInputTypePlace.value,
    link: popupInputTypeLink.value,
  });
  evt.target.reset();
  closePopup(popupTypePlace);
};

profileEdit.addEventListener('click', openTypeProfile);
profileAddButton.addEventListener('click', () => openPopup(popupTypePlace));
popupFormTypeProfile.addEventListener('submit', submitEditProfileForm);
 popupButtonClose.forEach((button) => {
 const popup = button.closest('.popup');
  button.addEventListener("click", () => closePopup(popup));
 });
popupFormTypePlace.addEventListener('submit', addCard)

popupButton.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupButtonOverlay = popupAddClosest(evt);
      closePopup(popupButtonOverlay);
    };
  });
});

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};
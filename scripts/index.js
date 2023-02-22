
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
const elementImage = document.querySelector('.popup__picture');                          
const elementTitle = document.querySelector('.popup__name');   

const cardsContainer = document.querySelector('.elements'); 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openTypeProfile() {
  openPopup(popupTypeProfile);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeJob.value = profileAbout.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeJob.value;
  closePopup(popupTypeProfile);
}

profileEdit.addEventListener("click", openTypeProfile);
profileAddButton.addEventListener("click", () => openPopup(popupTypePlace));
popupFormTypeProfile.addEventListener("submit", handleFormSubmit);
popupButtonClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener("click", () => closePopup(popup));
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt:   'Фото'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt:   'Фото'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt:   'Фото'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt:   'Фото'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt:   'Фото'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt:   'Фото'
  }

]; 

const createCard = (cards) => {
  const newCard = document.querySelector('#elements-template').content.cloneNode(true);
  const cardName = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__item');                
  cardName.textContent = cards.name;                                          
  cardImage.setAttribute('src', cards.link);                                                    
  cardImage.setAttribute('alt', cards.link);   
  return newCard                                        
  };

initialCards.forEach((card) => {
  const newCard = createCard(card)
  cardsContainer.append(newCard)
});

const likeButtons = document.querySelectorAll('.element__button'); 
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', toggleLike);
});

function toggleLike (evt) {
evt.target.classList.toggle('element__button_active');
};
  
const deleteButtons = document.querySelectorAll('.element__basket'); 
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', elementDelete);
})
function elementDelete (evt) {
    evt.target.closest('.element').remove();
};


const cardPictures = document.querySelectorAll('.element__item');
cardPictures.forEach((cardPicture) => {
  cardPicture.addEventListener('click', openPicture);
})
function openPicture (evt) {  
  openPopup(popupTypePicture);
 const imageSrc = evt.target.getAttribute('src');
 const imageAlt = evt.target.getAttribute('alt');
 const card = evt.target.closest('.element');
 const imageTitle = card.querySelector('.element__title').textContent;

const popupPicture = popupTypePicture.querySelector('.popup__picture');
const popupName = popupTypePicture.querySelector('.popup__name');

popupPicture.src = imageSrc;
popupPicture.alt = imageAlt;
popupName.textContent = imageTitle;
};
 
const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

popupFormTypePlace.addEventListener('submit', (evt) => { 
  evt.preventDefault();

  renderCard({
    name: popupInputTypePlace.value,
    link: popupInputTypeLink.value,
  });

  evt.target.reset();
  closePopup(popupTypePlace);
});
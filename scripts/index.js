import { initialCards, validationConfig } from "./constants.js";
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const profileEdit = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupFormTypeProfile = document.querySelector(".popup__form_type_profile");
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeJob = document.querySelector(".popup__input_type_job");
const popupTypeProfile = document.querySelector(".popup_type_profile");

const buttonsCloseList = document.querySelectorAll(".popup__button-close");
const popups = document.querySelectorAll(".popup");

const popupFormTypePlace = document.querySelector(".popup__form_type_place");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypePlace = document.querySelector(".popup_type_place");
const popupFormPlace = document.querySelector(".popup__form_place");
const popupInputTypePlace = document.querySelector(".popup__input_type_place");
const popupInputTypeLink = document.querySelector(".popup__input_type_link");

const popupTypePicture = document.querySelector(".popup_type_picture");
const popupPicture = document.querySelector(".popup__picture");
const popupName = document.querySelector(".popup__name");

const cardsContainer = document.querySelector(".elements");

const formTypePlaceValidator = new FormValidator(validationConfig,popupFormTypePlace);
formTypePlaceValidator.enableValidation();

const formTypeProfileValidator = new FormValidator(validationConfig,popupFormTypeProfile);
formTypeProfileValidator.enableValidation();

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscPopup);
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscPopup);
};

const handleEscPopup = (evt) => {
  if (evt.key === "Escape") {
    const popupClose = document.querySelector(".popup_opened");
    closePopup(popupClose);
  }
};

popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

function openPopupProfile() {
  formTypeProfileValidator.resetValidation();
  openPopup(popupTypeProfile);
  popupInputTypeName.value = profileName.textContent;
  popupInputTypeJob.value = profileAbout.textContent;
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputTypeName.value;
  profileAbout.textContent = popupInputTypeJob.value;
  closePopup(popupTypeProfile);
}

const viewPopupPicture = (cardImage) => {
  popupPicture.src = cardImage.link;
  popupPicture.alt = cardImage.name;
  popupName.textContent = cardImage.name;
  openPopup(popupTypePicture);
};

const generateCard = (data) => {
  const card = new Card(data, "#elements-template", viewPopupPicture);
  return card.generateCard();
};

initialCards.forEach((data) => {
  cardsContainer.append(generateCard(data));
});

const renderCard = (card) => {
  cardsContainer.prepend(generateCard(card));
};

function addCard(evt) {
  evt.preventDefault();
  renderCard({
    name: popupInputTypePlace.value,
    link: popupInputTypeLink.value,
  });
  closePopup(popupTypePlace);
}

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypePlace);
  popupInputTypePlace.value = "";
  popupInputTypeLink.value = "";
  formTypePlaceValidator.resetValidation();
});

profileEdit.addEventListener("click", openPopupProfile);
popupFormTypeProfile.addEventListener("submit", submitEditProfileForm);
buttonsCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
popupFormTypePlace.addEventListener("submit", addCard);
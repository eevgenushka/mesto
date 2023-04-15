import "../pages/index.css";
import { initialCards, validationConfig } from "../scripts/constants.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileEdit = document.querySelector(".profile__edit");
const popupFormTypeProfile = document.querySelector(
  ".popup__form_type_profile"
);
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeJob = document.querySelector(".popup__input_type_job");
const popupFormTypePlace = document.querySelector(".popup__form_type_place");
const profileAddButton = document.querySelector(".profile__add-button");

const formTypePlaceValidator = new FormValidator(
  validationConfig,
  popupFormTypePlace
);
formTypePlaceValidator.enableValidation();

const formTypeProfileValidator = new FormValidator(
  validationConfig,
  popupFormTypeProfile
);
formTypeProfileValidator.enableValidation();

const userInfo = new UserInfo(".profile__name", ".profile__about");

const popupWithImage = new PopupWithImage(".popup_type_picture");

const popupAddNewCard = new PopupWithForm(".popup_type_place", {
  submitForm: (item) => {
    cardList.addItem(createCard(item));
  },
});

profileAddButton.addEventListener("click", () => {
  popupAddNewCard.open();
  formTypePlaceValidator.resetValidation();
});

const popupEditProfile = new PopupWithForm(".popup_type_profile", {
  submitForm: (data) => {
    userInfo.setUserInfo(data.name, data.job);
  },
});

profileEdit.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  popupInputTypeName.value = user.name;
  popupInputTypeJob.value = user.info;
  popupEditProfile.open();
  formTypeProfileValidator.resetValidation();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements"
);

function openPopupPicture(item) {
  popupWithImage.open(item.name, item.link);
}

function createCard(item) {
  const cardObject = new Card(item, "#elements-template", openPopupPicture);
  const cardElement = cardObject.generateCard();
  return cardElement;
}

cardList.renderItems();

popupAddNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

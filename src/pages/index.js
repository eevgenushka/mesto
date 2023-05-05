import "../pages/index.css";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileEdit = document.querySelector(".profile__edit");
const popupFormTypeProfile = document.querySelector(
  ".popup__form_type_profile"
);
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeJob = document.querySelector(".popup__input_type_job");
const popupFormTypePlace = document.querySelector(".popup__form_type_place");
const profileAddButton = document.querySelector(".profile__add-button");
const formPopupAvatar = document.querySelector(".popup__form_type_avatar");
const avatarEditButton = document.querySelector(".profile__pen");

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "eca73e35-fc3e-49d2-9038-818b06a209fd",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getMyProfile(), api.getInitialCards()])
  .then(([{ name, about, avatar, _id }, cardsData]) => {
    userId = _id;
    userInfo.setUserInfo(name, about, avatar, _id);
    cardsSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

const formPopupEditAvatar = new PopupWithForm(".popup_type_avatar", (data) => {
  formPopupEditAvatar.renderLoading(true);
  validatorEditAvatar.disableButton();
  api
    .setNewAvatar(data)
    .then(({ name, about, avatar, _id }) => {
      userInfo.setUserInfo(name, about, avatar, _id);
      formPopupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
      formPopupEditAvatar.renderLoading(true, "Ошибка запроса!");
    })
    .finally(() => {
      formPopupEditAvatar.renderLoading(false);
      validatorEditAvatar.enableButton();
    });
});

const validatorEditAvatar = new FormValidator(
  validationConfig,
  formPopupAvatar
);
validatorEditAvatar.enableValidation();

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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const popupWithImage = new PopupWithImage(".popup_type_picture");

const formPopupDelete = new PopupWithSubmit(".popup_delete_card");

function handleDelete(card) {
  const handleConfirm = () => {
    api
      .deleteCard(card.cardId)
      .then((response) => {
        card.deleteCard(response);
        formPopupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  formPopupDelete.setSubmitAction(handleConfirm);
  formPopupDelete.open();
}

function createCard(data) {
  const card = new Card(
    data,
    userId,
    "#elements-template",
    () => popupWithImage.open(data.name, data.link),
    (cardId) => {
      api
        .setLikeCard(cardId)
        .then((res) => card.countLikes(res))
        .catch((err) => {
          console.log(err);
        });
    },
    (cardId) => {
      api
        .removeLikeCard(cardId)
        .then((res) => card.countLikes(res))
        .catch((err) => {
          console.log(err);
        });
    },
    {
      handleDeleteYourCard: handleDelete,
    }
  );

  return card.generateCard();
}

const popupAddNewCard = new PopupWithForm(".popup_type_place", (data) => {
  popupAddNewCard.renderLoading(true);
  formTypePlaceValidator.disableButton();
  api
    .setNewCard(data.name, data.link)
    .then((res) => {
      cardsSection.addItem(createCard(res));
      popupAddNewCard.close();
    })
    .catch((err) => {
      console.log(err);
      popupAddNewCard.renderLoading(true, "Ошибка запроса!");
    })
    .finally(() => {
      popupAddNewCard.renderLoading(false);
      formTypePlaceValidator.enableButton();
    });
});

const popupEditProfile = new PopupWithForm(
  ".popup_type_profile",
  (userData) => {
    popupEditProfile.renderLoading(true);
    formTypeProfileValidator.disableButton();
    api
      .editMyProfile(userData)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
        popupEditProfile.renderLoading(true);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
        formTypeProfileValidator.enableButton();
      });
  }
);

const cardsSection = new Section(
  {
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    },
  },
  ".elements"
);

profileAddButton.addEventListener("click", () => {
  popupAddNewCard.open();
  formTypePlaceValidator.resetValidation();
});

avatarEditButton.addEventListener("click", () => {
  validatorEditAvatar.resetValidation();
  formPopupEditAvatar.open();
});

profileEdit.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  popupInputTypeName.value = user.name;
  popupInputTypeJob.value = user.info;
  popupEditProfile.open();
  formTypeProfileValidator.resetValidation();
});

popupAddNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
formPopupDelete.setEventListeners();
formPopupEditAvatar.setEventListeners();

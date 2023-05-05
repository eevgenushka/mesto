export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleLike,
    handleUnlike,
    { handleDeleteYourCard }
  ) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this.cardId = data._id;
    this.likes = data.likes;
    this.userId = userId;
    this._owner = data.owner._id;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteYourCard = handleDeleteYourCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector(".element__title");
    this._cardElementPhoto = this._cardElement.querySelector(".element__item");
    this._cardElementLike = this._cardElement.querySelector(".element__button");
    this._cardElementDel = this._cardElement.querySelector(".element__basket");
    this._counter = this._cardElement.querySelector(".element__like-counter");
    this.countLikes(this._cardData);

    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;

    if (this._cardData.owner._id !== this.userId) {
      this._cardElementDel.classList.add("element__basket_hidden");
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _likeCard() {
    if (this._ifCardLiked()) {
      this._handleUnlike(this.cardId);
    } else {
      this._handleLike(this.cardId);
    }
  }

  _ifCardLiked() {
    return this._likes.some((item) => item._id === this.userId);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  countLikes(card) {
    this._likes = card.likes;
    this._counter.textContent = this._likes.length;

    if (this._ifCardLiked()) {
      this._cardElementLike.classList.add("element__button_active");
    } else {
      this._cardElementLike.classList.remove("element__button_active");
    }
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener("click", () => {
      this._likeCard(this);
    });
    this._cardElementDel.addEventListener("click", () => {
      this._handleDeleteYourCard(this);
    });
    this._cardElementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}

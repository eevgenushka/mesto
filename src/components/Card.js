export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteYourCard, handleLike, handleUnlike, userId) {
    this._cardData = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this.likes = data.likes;
    this._userId = userId;
    this._owner = data.owner;
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
    this._counter = this._cardElement.querySelector('.element__like-counter');

    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;
    this._counter.textContent = this._likesCounter;

      // if (this._userId !== this._cardData.owner._id) {
		  //   	this._cardElementDel.style.display = 'none'
		  //  };

    this._setEventListeners();

    return this._cardElement;
  }

  _likeCard() {
     this._cardElementLike.classList.toggle("element__button_active");
		}
		

  _ifCardLiked() {
		return this._likes.some((like) => this._userId === like._id);
	};

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  countLikes(card) {
		this._likes = card.likes;
		if (this._likes.length === 0) {
			this._counter.textContent = '0';
		} else {
			this._counter.textContent = this._likes.length
		};


		if (this._ifCardLiked()) {
			this.cardElementLike.classList.add('element__button_active');
		} else {
			this.cardElementLike.classList.remove('element__button_active');
		};
	};

  _setEventListeners() {
    this._cardElementLike.addEventListener("click", () => { this._likeCard(this)});
    this._cardElementDel.addEventListener("click", () => { this.deleteCard(this._cardId)});
    this._cardElementPhoto.addEventListener("click", () => {
      this._handleCardClick( this._link, this._name,) }
    );
  }
}


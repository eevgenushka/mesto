import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleDelete) {
		super(popupSelector);

		this._handleDelete = handleDelete;
		this._buttonSubmit = this._popup.querySelector('.popup__form');
	};

	open(card, cardId) {
		super.open();

		this._card = card;
		this._cardId = cardId;
	};

	setEventListeners() {
		super.setEventListeners();

		this._buttonSubmit.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleDelete({idCard: this._idCard, card: this._card});
		});
	};

};
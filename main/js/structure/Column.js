import { Card } from './Card.js';

export class Column {
	constructor(board, element) {
		this.board = board;
		this.element = element;

		const itemElements = element.querySelectorAll('.board__item');
		this.cards = Array.from(itemElements).map(item => new Card(this, item));

		this.#init();
	}

	#init() {
		this.element.querySelector('.column__add-button').addEventListener('click', e => {
			e.preventDefault();
			this.board.editCard(new Card(this, null));
		});
	}

	createCard(title, content) {
		const boardRow = document.createElement('div');
		boardRow.classList.add('board__row');

		const boardItem = document.createElement('div');
		boardItem.classList.add('board__item');
		boardItem.setAttribute('draggable', true);

		const boardCard = document.createElement('div');
		boardCard.classList.add('board__card');
		boardCard.classList.add('card');

		const cardTitle = document.createElement('div');
		cardTitle.classList.add('card__title');
		cardTitle.textContent = title;

		const cardContent = document.createElement('div');
		cardContent.classList.add('card__content');
		cardContent.textContent = content;

		boardRow.appendChild(boardItem);
		boardItem.appendChild(boardCard);
		boardCard.appendChild(cardTitle);
		boardCard.appendChild(cardContent);

		this.element.insertBefore(boardRow, this.cards[0].boardRow)

		this.cards.unshift(new Card(this, boardItem));
	}

	putCard(card, afterCard) {
		if (dropIndex >= this.cards.length) {
			this.element.appendChild(card.boardRow);
			return;
		}

		this.element.insertBefore(card.boardRow, this.cards[dropIndex].boardRow);
	}
}
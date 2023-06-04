import { Card } from './Card.js';

export class Column {
	constructor(board, element) {
		this.board = board;
		this.element = element;

		const itemElements = element.querySelectorAll('.board__item');
		this.cards = Array.from(itemElements).map(item => new Card(this, item));
	}

	putCard(card, afterCard) {
		if (dropIndex >= this.cards.length) {
			this.element.appendChild(card.boardRow);
			return;
		}

		this.element.insertBefore(card.boardRow, this.cards[dropIndex].boardRow);
	}
}
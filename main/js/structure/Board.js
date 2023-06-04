import { Column } from './Column.js';

export class Board {
	constructor(element) {
		this.element = element;
		console.log(element.querySelectorAll('.board__column'));
		this.columns = Array.from(element.querySelectorAll('.board__column')).map(column => new Column(this, column));
		this.draggedCard = null;
		this.targetCard = null;
	}

	moveCard(cardFrom, cardTo) {
		const targetColumn = cardTo.column;
		const cardsAmount = targetColumn.cards.length;
		const dropIndex = targetColumn.cards.indexOf(cardTo);
		if (dropIndex >= cardsAmount - 1) {
			targetColumn.element.appendChild(cardFrom.boardRow);
			return;
		} else {
			targetColumn.element.insertBefore(cardFrom.boardRow, targetColumn.cards[dropIndex + 1].boardRow);
		}
	}
}
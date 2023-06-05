import { Column } from './Column.js';

export class Board {
	constructor(element) {
		this.element = element;
		console.log(element.querySelectorAll('.board__column'));
		this.columns = Array.from(element.querySelectorAll('.board__column')).map(column => new Column(this, column));
		this.draggedCard = null;
		this.targetCard = null;
		this.editingCard = null;
	}

	moveCard(cardFrom, cardTo) {
		const targetColumn = cardTo.column;
		const cardsAmount = targetColumn.cards.length;

		if (cardFrom.column === cardTo.column) {
			targetColumn.cards.splice(cardFrom.getIndex(), 1);
		}
		targetColumn.cards.splice(cardTo.getIndex(), 0, cardFrom);

		const dropIndex = cardTo.getIndex();

		if (dropIndex >= cardsAmount - 1) {
			targetColumn.element.appendChild(cardFrom.boardRow);
			return;
		} else {
			targetColumn.element.insertBefore(cardFrom.boardRow, targetColumn.cards[dropIndex + 1].boardRow);
		}
	}

	editCard(card) {
		this.editingCard = card;
		const { title, content } = card.getContent();
		document.querySelector('body').setAttribute("modal-open", "")
		document.querySelector('.modal').style.display = "flex";

		document.querySelector('.editable__title').value = title;
		document.querySelector('.editable__content').value = content;
	}

	saveCard(card) {
		const title = document.querySelector('.editable__title').value;
		const content = document.querySelector('.editable__content').value;
		card.setContent(title, content);
		this.closeModal();
	}

	closeModal() {
		this.editingCard = null;
		document.querySelector('body').removeAttribute("modal-open");
		document.querySelector('.modal').style.display = "none";
	}
}
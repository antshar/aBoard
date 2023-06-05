export class Card {
	constructor(column, element) {
		this.column = column;
		this.element = element;
		this.boardRow = element?.parentNode;
		this.#init();
	}

	#init() {
		this.element?.addEventListener('dragstart', e => {
			this.boardRow.classList.add('board__row_dragging');
			this.column.board.draggedCard = this;
		});

		this.element?.addEventListener('dragend', e => {
			this.boardRow.classList.remove('board__row_dragging');
			this.column.board.moveCard(this, this.column.board.targetCard);
		});

		this.element?.addEventListener('dragover', e => {
			this.boardRow.classList.add('board__row_drag-after');
			this.column.board.targetCard = this;
		});

		this.element?.addEventListener('dragleave', e => {
			this.boardRow.classList.remove('board__row_drag-after');
		});

		this.element?.addEventListener('click', e => {
			this.column.board.editCard(this);
		});
	}

	getIndex() {
		return this.column.cards.indexOf(this);
	}

	getContent() {
		const title = this.element?.querySelector('.card__title').textContent;
		const content = this.element?.querySelector('.card__content').textContent;
		return { title, content };
	}

	setContent(title, content) {
		this.element.querySelector('.card__title').textContent = title;
		this.element.querySelector('.card__content').textContent = content;
	}
}
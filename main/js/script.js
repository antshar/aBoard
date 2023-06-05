import { Board } from './structure/Board.js';

const board = new Board(document.querySelector('.board'));

document.querySelector('.controls__cancel').addEventListener('click', e => {
	e.preventDefault();
	board.closeModal();
});

document.querySelector('.controls__save').addEventListener('click', e => {
	e.preventDefault();
	board.saveCard(board.editingCard);
});
// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also


        let boardContainer = document.querySelector('#boards');
        boards.forEach(function (board) {
            //the content should be appended to the content+board id div
            console.log(board);
            dom._appendToElement(boardContainer, '<button id="' + board.id + '" class="collapsible">' + board.title + '</button>\n' +
                '<div class="content' + board.id + '">');
            let theBoard = document.getElementById(' '+board.id+'');
            theBoard.addEventListener('click',  function () {
            dom._appendToElement(boardContainer, '<div class="board' + board.id + '"><button id="' + board.id + '" class="collapsible">' + board.title + '</button>\n' +
                '<div class="content' + board.id + '"></div>');
            let theBoard = document.getElementById('' + board.id + '');
            theBoard.addEventListener('click', function () {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                dom.loadCards(board.id)
            });

        })
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let columns = ['new', 'in progress', 'testing', 'done'];
        columns.forEach(function (column) {
            let columnDiv = document.createElement('div');
            columnDiv.setAttribute('class', 'column');
            columnDiv.value = column;
            cards.forEach(function (card) {
            let cardDiv = document.createElement('div');
            cardDiv.setAttribute('class', 'card');
            let cardText = document.createTextNode(card);
            cardDiv.appendChild(cardText)
            });
        });

    },
    // here comes more features
};

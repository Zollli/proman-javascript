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



            dom._appendToElement(boardContainer, '<section class="board"><div class="board-header"><span class="board-title">' + board.title + ''+
                '</span><button class="board-add">Add Card</button><button class="board-toggle" id=" '+ board.id +' "></button></div>' +
                '<div class="board-columns" id="content' + board.id +'"></div></section');
            let boardToggles = document.querySelectorAll(".board-toggle");
            for (let i=0;i<boardToggles.length;i++){
                boardToggles[i].addEventListener("click",function () {
                    dom.loadCards(board.id)
                })
            }

            
            /*let theBoard = document.getElementById('' + board.id + '');
            theBoard.addEventListener('click', function () {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                dom.loadCards(board.id)
            });*/

        })
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards)
        })
    },
    showCards: function (cards) {
        let columnTitles = ["new","In progress","Testing","Done"];
        let content = document.querySelector("#content1");
        for (let i=0;i<4;i++){
            dom._appendToElement(content,'<div class="board-column"><div class="board-column-title" >' + columnTitles[i] + '</div>' +
                '<div class="board-column-content"><div class="card" ><div class="card-remove" ></div></div></div></div>')











        }


    },
    // here comes more features
};

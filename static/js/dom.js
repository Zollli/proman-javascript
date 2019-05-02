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
        let modal = document.createElement("div");
        modal.setAttribute("id","clap");
        modal.setAttribute("class", "clap-modal");
        let img = document.createElement("img");
        img.setAttribute("src","https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif");
        img.setAttribute("alt","clap");
        modal.style.display = "none";
        modal.appendChild(img);
        boardContainer.appendChild(modal);

        boards.forEach(function (board) {
            //the content should be appended to the content+board id div



            dom._appendToElement(boardContainer, '<section class="board"><div class="board-header"><span class="board-title">' + board.title + ''+
                '</span><button class="board-add">Add Card</button><button class="board-toggle" id="'+ board.id +'">Open</button></div>' +
                '<div class="board-columns" id="content' + board.id +'"></div></section');
            let boardToggles = document.querySelectorAll(".board-toggle");
            for (let i=0;i<boardToggles.length;i++){
                boardToggles[i].addEventListener("click",function () {
                    dom.loadCards(board.id)
                })
            }

        })
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards,boardId)
        })
    },
    showCards: function (cards,boardID) {
        let columnTitles = ["new","In progress","Testing","Done"];
        let contentID = "#content" + boardID;
        let content = document.querySelector(contentID);
        for (let i=0;i<4;i++){
            dom._appendToElement(content,'<div class="board-column"><div class="board-column-title" >' + columnTitles[i] + '</div>' +
                '<div class="board-column-content"><div class="card" id="'+ boardID + i +'" ><div class="card-remove" ></div></div></div></div>')
            }
        let cardDIV = document.querySelector(".card");
        for (let card of cards){
            dom._appendToElement(cardDIV,'<div class="card-title" >'+ card.title +'<button class="done">Done</button></div>')
            }
        dragula([
          document.getElementById("10"),
            document.getElementById("11"),
          document.getElementById("12"),
          document.getElementById("13"),
          document.getElementById("20"),
          document.getElementById("21"),
          document.getElementById("22"),
          document.getElementById("23")

          //document.getElementById("2"),
          //document.getElementById("3")
            ]);


    let doneButtons = document.querySelectorAll(".done");
    for (let i=0;i<doneButtons.length;i++){
        doneButtons[i].addEventListener("click",function () {
            let modal = document.querySelector("#clap");
            modal.style.display ='block';
            setTimeout(function(){
               modal.style.display ='none'
            },3000);




        })
    }


    },// here comes more features
};

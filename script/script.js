/**
/* входные элементы, которые должны быть видимы глобально: 
/* @param divNode - контент галереи
/* @param btnNode - кнопка 
/* @param pageField - поле ввода страницы .input1
/* @param limitField - поле ввода страницы .input2
/*--------------------------------------------------------------
/* Не стоит все валить в одну кучу, потому что: 
/* 1. Проверка диапазона и страницы может не дойти до xhr запроса 
/* 2. xhr запрос может выдать ошибку и отрисовка пойдет по пизде
/* Я бы сделал так: разделил саму задачу на 3 модуля (функции):
/* @param checkLimit(value) - функия проверки лимита. @param value - входной параметр введенного диапазона возвращает true или false
/* @param sendXHR(limit,page) - функция обработки запроса
/* @param showGallery(response) - функция отрисовки на основе входных данных
/*--------------------------------------------------------------
/* 2 eventListener'a:
/* 1. на кнопку - при ее нажатии происходит вызов
/*    функции проверки лимитов, если все ок - вызов XHR запроса и при успешном результате - вызов функции отрисовки галереи
/* 2. на window 'DOMContentLoaded' событие :
/*    если window.localStorage.getItem('gallery') существует - вызов функции отрисовки галереи
*/
window.onload = ()=> {
  let storedGallery=window.localStorage.getItem('gallery');
  console.log(storedGallery);
  if (storedGallery) {
   gallery(storedGallery);
  }
  }

let divNode = document.querySelector('.div');
let btnNode = document.querySelector('.button');

let value;

function checkLimit(value) {
  if (value<=10 && value>=1){
 return true;
 } else {
 return false;
 }
 }

function sendXHR(pageField, limitField) {
  let xhr = new XMLHttpRequest();
          xhr.open('GET', `https://picsum.photos/v2/list?page=${pageField}&limit=${limitField}`, true);
          xhr.send();
          xhr.onload = function() {
            if (xhr.status != 200) { 
              console.log(`Error`);
            } else {
          let result = JSON.parse(xhr.response);
          window.localStorage.setItem("gallery",JSON.parse(xhr.response))
          gallery(result);
                                        }                                                       
}}

function gallery(result) {
                let cards = '';
                  result.forEach(item => {
                      let cardBlock = `<div class="card"><img src="${item.download_url}" class="card-image"></div>`;
                  cards +=  cardBlock;
                });         
                divNode.innerHTML = cards;
                
}



 btnNode.addEventListener('click', () => {
  let pageField = document.querySelector('.input1').value;
  let limitField = document.querySelector('.input2').value;
  let limitPage=checkLimit(pageField);
  console.log(limitPage);
  let limitLimit=checkLimit(limitField);
  console.log(limitLimit);
  if (limitPage && limitLimit) {
    sendXHR(pageField, limitField);
 } else if (!limitPage && !limitLimit) {
    divNode.innerHTML=`<br><span>«Страница и лимит вне диапазона от 1 до 10»</span>`; }
 else if (limitPage) {
   divNode.innerHTML=`<br><span>«Лимит вне диапазона от 1 до 10»</span>`;
 } else {
   divNode.innerHTML= `<br><span>«Страница вне диапазона от 1 до 10»</span>`;
 }
 }); 


   
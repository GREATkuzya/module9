let divNode = document.querySelector('.div');
let btnNode = document.querySelector('.button');

btnNode.addEventListener('click', () => {
    let a = document.querySelector('.input1').value;
    let b = document.querySelector('.input2').value;
   
    switch (true) {
      case (a > 10 && b >=1 && b <=10) : 
        let err2 = `<br><span>«Страница вне диапазона от 1 до 10»</span>`;
        divNode.innerHTML = err2;
        break;
      
      case (a >= 1 && a <= 10 && b >10) :
        let err = `<br><span>«Лимит вне диапазона от 1 до 10»</span>`;
        divNode.innerHTML = err;
        break;
      
      case (a > 10 && b >10) : 
        let err1 = `<br><span>«Страница и лимит вне диапазона от 1 до 10»</span>`;
        divNode.innerHTML = err1;
        break;
        
      default: 
        let xhr = new XMLHttpRequest();
          xhr.open('GET', `https://picsum.photos/v2/list?page=${a}&limit=${b}`, true);
          xhr.send();
          xhr.onload = function() {
          let result = JSON.parse(xhr.response);
                console.log(result);
                let cards = '';
                  result.forEach(item => {
                      let cardBlock = `<div class="card"><img src="${item.download_url}" class="card-image"></div>`;
                  cards +=  cardBlock;
                });         
                divNode.innerHTML = cards;
                        }}      
     

      
      
      
     



// if (a > 10 && b >=1 && b <=10) {
//   let err2 = `<br><span>«Страница вне диапазона от 1 до 10»</span>`;
//   divNode.innerHTML = err2;
// }
// else if (a >= 1 && a <= 10 && b >=10) {
//   let err = `<br><span>«Лимит вне диапазона от 1 до 10»</span>`;
//   divNode.innerHTML = err;
// }
// else if (a > 10 && b >10) {
//   let err1 = `<br><span>«Страница лимит вне диапазона от 1 до 10»</span>`;
//   divNode.innerHTML = err1;}
// else {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', `https://picsum.photos/v2/list?page=${a}&limit=${b}`, true);
//     xhr.send();
//     xhr.onload = function() {
//     let result = JSON.parse(xhr.response);
//           console.log(result);
//           let cards = '';
//             result.forEach(item => {
//                 let cardBlock = `<div class="card"><img src="${item.download_url}" class="card-image"></div>`;
//             cards +=  cardBlock;
//           });         
//           divNode.innerHTML = cards;
//                    }
//   }
})


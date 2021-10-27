var BalkenContainer = document.getElementById("Balken");
var slidebar = document.querySelector('#myRange');
var schnelligkeit = slidebar.value;

slidebar.addEventListener('change', function(){
  schnelligkeit = slidebar.value;
})

//generate new Array Button

const generateArrayButton = document.querySelector('#createArray');
generateArrayButton.addEventListener('click', function(){
  generateArrayButton.innerText = "Andere Balken Generieren";
   BalkenContainer.innerHTML = "";
   buttonBS.disabled = false;
   SelectionSortButton.disabled = false;
   buttonBS.style.backgroundColor = "rgba(0, 136, 169, 1)";
   SelectionSortButton.style.backgroundColor = "rgba(0, 136, 169, 1)";
   schnelligkeit = 50;
   slidebar.value = 50;
    generatearray();
})

//button für Selectionsort
const SelectionSortButton = document.querySelector("#SelectionS")
SelectionSortButton.addEventListener('click', function(){
  generateArrayButton.innerText = "Reset"
  buttonBS.disabled = true;
  buttonBS.style.backgroundColor = "grey";
  SelectionSortButton.disabled = true;
  SelectionSortButton.style.backgroundColor = "grey";
  SelectionSort();
  
  
})

//button für Bubblesort
const buttonBS = document.querySelector('#buttonBS');
buttonBS.addEventListener('click', function(){
  generateArrayButton.innerText = "Reset"
  buttonBS.disabled = true;
  buttonBS.style.backgroundColor = "grey";
  SelectionSortButton.disabled = true;
  SelectionSortButton.style.backgroundColor = "grey";
    BubbleSort(schnelligkeit);
    
    
})

//startseite balken sobald man drauf landet
for (var i = 0; i < 51; i++) {
  
  var value = Math.ceil(Math.random() * (150 - 30) + 30);
  var Balken = document.createElement("div");

  Balken.classList.add("block");

  Balken.style.height = `${value * 3.1}px`;
  Balken.style.transform = `translate(${i * 30.125}px)`;

  var Balken_label = document.createElement("label");
  Balken_label.classList.add("einzelnerBalken");
  Balken_label.innerText = value;

  Balken.appendChild(Balken_label);
  BalkenContainer.appendChild(Balken);
 
}
  
//Neues Array von Balken generieren
function generatearray() {
    for (var i = 0; i < 51; i++) {
  
        var value = Math.ceil(Math.random() * (150 - 30) + 30);
        var Balken = document.createElement("div");

        Balken.classList.add("block");
  
        Balken.style.height = `${value * 3.1}px`;
        Balken.style.transform = `translate(${i * 30.125}px)`;

        var Balken_label = document.createElement("label");
        Balken_label.classList.add("einzelnerBalken");
        Balken_label.innerText = value;

        Balken.appendChild(Balken_label);
        BalkenContainer.appendChild(Balken);
    }
}

async function BubbleSort(schnelligkeit) {
  var blocks = document.querySelectorAll(".block");
  //BubbleSort
  for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks.length - i - 1; j++) {
          blocks[j].style.backgroundColor = "#FF4949";
          blocks[j + 1].style.backgroundColor = "#FF4949";

          // warten
          await new Promise((resolve) =>
              setTimeout(() => {
                  resolve();
              }, schnelligkeit*1.5)
          );
          let value1 = Number(blocks[j].childNodes[0].innerHTML);
          let value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

          if (value1 > value2) {
              await swap(blocks[j], blocks[j + 1]);
              blocks = document.querySelectorAll(".block");
          }
          blocks[j].style.backgroundColor = "#48cae4";
          blocks[j + 1].style.backgroundColor = "#48cae4";
      }
      blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
  generateArrayButton.innerText = "Reset";
}
  
// tauschen von balken für bubblesort
function swap(Balken1, Balken2) {
    return new Promise((resolve) => {
        var temp = Balken1.style.transform;
        Balken1.style.transform = Balken2.style.transform;
        Balken2.style.transform = temp;
  
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                BalkenContainer.insertBefore(Balken2, Balken1);
                resolve();
            }, schnelligkeit*2);
        });
    });
}

//selectionSort algorithmus

async function SelectionSort(delay = 300) {
    let Balken = document.querySelectorAll(".block");
    
     var minimalerIndex = 0;
     for (let i = 0; i < Balken.length; i++) {
    
     
      minimalerIndex = i;
    
      // i-ten balken markieren
      Balken[i].style.backgroundColor = "#808080";
      for (let j = i + 1; j < Balken.length; j++) {
    
        // j-ten balken markieren
        Balken[j].style.backgroundColor = "#FF4949";
          
        // warten
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, schnelligkeit)
          
        );
    
        var value1 = parseInt(Balken[j].childNodes[0].innerHTML);
        var value2 = parseInt(Balken[minimalerIndex].childNodes[0].innerHTML);
          
        //vergelichen von value1 und value2
        if (value1 < value2) {
          if (minimalerIndex !== i) {
    
            Balken[minimalerIndex].style.backgroundColor = "rgb(24, 190, 255)";
          }
          minimalerIndex = j;
        } else {
    
          Balken[j].style.backgroundColor = "rgb(24, 190, 255)";
        }
      }
    
      //tausch
      let temp1 = Balken[minimalerIndex].style.height;
      let temp2 = Balken[minimalerIndex].childNodes[0].innerText;
      Balken[minimalerIndex].style.height = Balken[i].style.height;
      Balken[i].style.height = temp1;
      Balken[minimalerIndex].childNodes[0].innerText = Balken[i].childNodes[0].innerText;
      Balken[i].childNodes[0].innerText = temp2;
    
        
      //warten
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, schnelligkeit*2)
      );
    
      Balken[minimalerIndex].style.backgroundColor = "rgb(24, 190, 255)";
      //kleinster balken farbe ändern
      Balken[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
    generateArrayButton.innerText = "Reset"
    
  }

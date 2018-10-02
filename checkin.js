let __submitCheckin = function () {
    if(__checkin.submitted) {
        window.location='https://www.columbusgo.club/checkin';
    }
};

const __checkin = (() => {
  const checkin = {
    submitted: false,
    currentFocus: undefined,
    validateUser: (input) => {
      if (typeof input !== "string") { return false; }
      let result = __tabletop.existingUsers.indexOf(input);
      if (result === -1) {
        event.preventDefault();
        alert('Couldn\'t find an existing user with that name!');
        return false;
      }
      return true;
    },

    setupAutocomplete: (inp, arr) => {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/

      /* Respond to input changes on the name field */
      inp.addEventListener("input", (e) => {
          let elem = e.target;
          let val = elem.value;
          let arr = __tabletop.existingUsers;
          let a, b, i;
          /*close any already open lists of autocompleted values*/
          __checkin.closeAllLists();
          if (!val) { return false;}
          __checkin.currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          elem.parentNode.appendChild(a);
          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
              __checkin.currentFocus = i;
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", (e) => {
                  /*insert the value for the autocomplete text field:*/
                  inp.value = e.target.textContent;
                  /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
                  __checkin.closeAllLists();
              });
              a.appendChild(b);
            }
          }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", (e) => {
          let x = document.getElementById("autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            __checkin.currentFocus++;
            /*and and make the current item more visible:*/
            __checkin.addActive(x);
          } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            __checkin.currentFocus--;
            /*and and make the current item more visible:*/
            __checkin.addActive(x);
          } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            let nameInput = document.getElementById("myInput");
            if (__checkin.currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x){
                nameInput.value = x[__checkin.currentFocus].textContent;
                __checkin.closeAllLists();
              }
            }
          }
      });

    },
    closeAllLists: (elmnt) => {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      let inp = document.getElementById('myInput');
      for (let i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    },
    removeActive: (x) => {
      /*remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    },
    addActive: (x) => {
      /*classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      __checkin.removeActive(x);
      if (__checkin.currentFocus >= x.length) __checkin.currentFocus = 0;
      if (__checkin.currentFocus < 0) __checkin.currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[__checkin.currentFocus].classList.add("autocomplete-active");
    },
    init: () => {
      /* stop autocompleting once someone clicks outside the search field */
      document.addEventListener("click", (e) => {
          __checkin.closeAllLists(e.target);
      });
    }
   };
  checkin.init();
  return checkin;
})();

const __tabletop = (() => {
  return {

    existingUsers: [],
    publicSpreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1X6zE0Lq4qS9sodQOP0QX-ZyzCG6njhi7WIC-Z3uV4GY/edit?usp=sharing',

    init: ()  => {
      Tabletop.init( { key: __tabletop.publicSpreadsheetUrl,
                       callback: __tabletop.showInfo,
                       simpleSheet: true,
                       orderby: "FullName"
                     } );
    },

    showInfo: (data, tabletop) => {
      for (let user of data) {
          if (user && user.FullName && user.FullName !== '?') {
              __tabletop.existingUsers.push(user.FullName);
          }
      }
      __checkin.setupAutocomplete(document.getElementById("myInput"), __tabletop.existingUsers);
    },
  };
})();

window.addEventListener('DOMContentLoaded', __tabletop.init);

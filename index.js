import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://addtocart-11035-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppinglistInDB = ref(database, "items");

const inputFieldEl = document.getElementById("input1");
const addButtonEl = document.getElementById("b1");
const savebutton = document.getElementById("list");

onValue(shoppinglistInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
    
        clearShoppingListEl();
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            
            appendItemToShoppingListEl(currentItem);
        }    
    } else {
        savebutton.innerHTML = "No items here... yet";
    }
});

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppinglistInDB, inputValue);
    clearInputFieldEl();
});

function clearShoppingListEl() {
    savebutton.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];
    
    let newEl = document.createElement("li");
    
    newEl.textContent = itemValue;
    savebutton.appendChild(newEl);
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`);
        
        remove(exactLocationOfItemInDB);
    });
}

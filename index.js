console.log("Your code goes here!!");

// Targeting the tablebar & menubar

const tableItemsBoxes = document.getElementsByClassName("table-items");
// console.log(tableItemsBoxes[0].children[0].children) ; 
const tableDetailsBoxes = document.getElementsByClassName("table-details");

const menuItemBoxes = document.getElementsByClassName("menu-items");
const menuDetailsBoxes = document.getElementsByClassName("menu-details");

// Targeting all tables
const table1 = document.getElementById("table-1");
const table2 = document.getElementById("table-2");
const table3 = document.getElementById("table-3");
const table4 = document.getElementById("table-4");
const table5 = document.getElementById("table-5");


/*
Making map for each table which will store the itemName as a key and array of [itemPrice , ItemQuantity] as a value
which will be used to update the popup & generate bill 

*/

let table_1Map = new Map();
let table_2Map = new Map();
let table_3Map = new Map();
let table_4Map = new Map();
let table_5Map = new Map();


// Targeting the searchbar
const tableSearchBar = document.forms["search-tables"].querySelector("input");
const menuSearchBar = document.forms["search-menus"].querySelector("input");

// On double click for table1
table1.addEventListener("dblclick", () => {
  // On double click, popup will open if it has some item added on it
  if (table_1Map.size) {
    popup1.classList.add("show");
    overlay.classList.add("show");
    document.body.appendChild(overlay);

    let tableCardPrice = tableItemsBoxes[0].children[0].children[1] ; 
    let tableCardQuantity = tableItemsBoxes[0].children[0].children[2] ;   

    // Function to checkout current table 
    checkoutTable( popup1 ,"table-1CheckoutBtn", "popup1TableBill" , table_1Map  , tableCardPrice , tableCardQuantity);

    // On click on x , popup will be close
    closeBtn1.addEventListener("click", () => {
      popup1.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
});

// On double click for table2
table2.addEventListener("dblclick", () => {
  // On double click, popup will open if it has some item added on it
  if (table_2Map.size) {
    popup2.classList.add("show");
    overlay.classList.add("show");
    document.body.appendChild(overlay);

    let tableCardPrice = tableItemsBoxes[1].children[0].children[1] ; 
    let tableCardQuantity = tableItemsBoxes[1].children[0].children[2] ; 

    // Function to checkout current table 
    checkoutTable(popup2 ,  "table-2CheckoutBtn", "popup2TableBill" , table_2Map , tableCardPrice , tableCardQuantity );

    // On click on x , popup will be close
    closeBtn2.addEventListener("click", () => {
      popup2.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
});

// On double click for table3
table3.addEventListener("dblclick", () => {
  // On double click, popup will open if it has some item added on it
  if (table_3Map.size) {
    popup3.classList.add("show");
    overlay.classList.add("show");
    document.body.appendChild(overlay);

    let tableCardPrice = tableItemsBoxes[2].children[0].children[1] ; 
    let tableCardQuantity = tableItemsBoxes[2].children[0].children[2] ; 

    // Function to checkout current table 
    checkoutTable( popup3 , "table-3CheckoutBtn" , "popup3TableBill" , table_3Map  , tableCardPrice , tableCardQuantity);

    // On click on x , popup will be close
    closeBtn3.addEventListener("click", () => {
      popup3.classList.remove("show");
      overlay.classList.remove("show");
    });
  } 
});

// On double click for table4
table4.addEventListener("dblclick", () => {
  // On double click, popup will open if it has some item added on it
  if (table_4Map.size) {
    popup4.classList.add("show");
    overlay.classList.add("show");
    document.body.appendChild(overlay);

    let tableCardPrice = tableItemsBoxes[3].children[0].children[1] ; 
    let tableCardQuantity = tableItemsBoxes[3].children[0].children[2] ; 

     // Function to checkout current table 
    checkoutTable( popup4,  "table-4CheckoutBtn" , "popup4TableBill" , table_4Map , tableCardPrice , tableCardQuantity );

    // On click on x , popup will be close
    closeBtn4.addEventListener("click", () => {
      popup4.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
  

});

table5.addEventListener("dblclick", () => {
  // On double click, popup will open if it has some item added on it.
  if (table_5Map.size) {
    popup5.classList.add("show");
    overlay.classList.add("show");
    document.body.appendChild(overlay);

    let tableCardPrice = tableItemsBoxes[4].children[0].children[1] ; 
    let tableCardQuantity = tableItemsBoxes[4].children[0].children[2] ; 

    // Function to checkout current table 
    checkoutTable(popup5 ,  "table-5CheckoutBtn", "popup5TableBill" , table_5Map  , tableCardPrice , tableCardQuantity);

    // On click on x , popup will be close
    closeBtn5.addEventListener("click", () => {
      popup5.classList.remove("show");
      overlay.classList.remove("show");
    });
  }
  
});



// Search Functionality Code Start:

// Search for the specific table
tableSearchBar.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  Array.from(tableItemsBoxes).forEach((tableBox) => {
    const tableName = tableBox.firstElementChild.textContent;
    // console.log(tableName) ;
    if (tableName.toLowerCase().indexOf(searchTerm) != -1) {
      tableBox.style.display = "block";
    } else {
      tableBox.style.display = "none";
    }
  });
});


// Search for the specific menu

menuSearchBar.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  Array.from(menuItemBoxes).forEach((menuBox) => {
    const menuName = menuBox.firstElementChild.textContent;
    if (menuName.toLowerCase().indexOf(searchTerm) != -1) {
      menuBox.style.display = "block";
    } else {
      menuBox.style.display = "none";
    }
  });
});

// Search Functionality Code End.


// Feature of drop & drag 

// Drag Function Start
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// Drag Function End


// Drop function Start
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  let tableDet = ev.target.children;
  let itemsInfos = document.getElementById(data).children;
  let itemName = itemsInfos[0].textContent;
  let itemPrice = parseInt(itemsInfos[1].textContent.replace(/\D/g, "")); // rs. 100
  let tableName = tableDet[0].textContent;
  let tablePrice = parseInt(tableDet[1].textContent.split(": ")[1]);
  let itemsQuantity = parseInt(tableDet[2].textContent.split(": ")[1]);

  // Updating the price on tableDet
  let updatedPrice = tablePrice + itemPrice;
  tableDet[1].textContent = `Rs: ${updatedPrice}`;

  if (tableName == "Table 1") {
    // if itemInfo not present in map
    if (!table_1Map.has(itemName)) {
      table_1Map.set(itemName, [itemPrice, 1]);
      itemsQuantity++;
      tableDet[2].textContent = `Total items: ${itemsQuantity}`;
      let serialNo = table_1Map.size;
      generateRow(table_1Map,tableDet[1],tableDet[2],updatedPrice,itemsQuantity,serialNo, "popup1Bill", itemName, itemPrice);
    }
    // If it is present in map
    else {
      // Updating the quantity of already added item in map
      table_1Map.set(itemName, [itemPrice, table_1Map.get(itemName)[1] + 1]);
      updateInput(table_1Map, "popup1" , itemName );
    }
  }

  if (tableName == "Table 2") {
    // if itemInfo not present in map
    if (!table_2Map.has(itemName)) {
      table_2Map.set(itemName, [itemPrice, 1]);
      itemsQuantity++;
      tableDet[2].textContent = `Total items: ${itemsQuantity}`;
      let serialNo = table_2Map.size;
      generateRow(table_2Map,tableDet[1],tableDet[2],updatedPrice,itemsQuantity, serialNo, "popup2Bill", itemName, itemPrice);
      
    }
    // If it is present in map
    else {
      // Updating the quantity of already added item in map
      table_2Map.set(itemName, [itemPrice, table_2Map.get(itemName)[1] + 1]);
      updateInput(table_2Map, "popup2" , itemName );
    }
  }

  if (tableName == "Table 3") {
    // if itemInfo not present in map
    if (!table_3Map.has(itemName)) {
      table_3Map.set(itemName, [itemPrice, 1]);
      itemsQuantity++;
      tableDet[2].textContent = `Total items: ${itemsQuantity}`;
      let serialNo = table_3Map.size;
      generateRow(table_3Map,tableDet[1],tableDet[2],updatedPrice,itemsQuantity, serialNo, "popup3Bill", itemName, itemPrice);
    }
    // If it is present in map
    else {
      // Updating the quantity of already added item in map
      table_3Map.set(itemName, [itemPrice, table_3Map.get(itemName)[1] + 1]);
      updateInput(table_3Map, "popup3" , itemName );
    }
  }

  if (tableName == "Table 4") {
    // if itemInfo not present in map
    if (!table_4Map.has(itemName)) {
      table_4Map.set(itemName, [itemPrice, 1]);
      itemsQuantity++;
      tableDet[2].textContent = `Total items: ${itemsQuantity}`;
      let serialNo = table_4Map.size;
      generateRow(table_4Map,tableDet[1],tableDet[2],updatedPrice,itemsQuantity, serialNo, "popup4Bill", itemName, itemPrice);
    }
    // If it is present in map
    else {
      // Updating the quantity of already added item in map
      table_4Map.set(itemName, [itemPrice, table_4Map.get(itemName)[1] + 1]);
      updateInput(table_4Map, "popup4" , itemName );
    }
  }

  if (tableName == "Table 5") {
    // if itemInfo not present in map
    if (!table_5Map.has(itemName)) {
      table_5Map.set(itemName, [itemPrice, 1]);
      itemsQuantity++;
      tableDet[2].textContent = `Total items: ${itemsQuantity}`;
      let serialNo = table_5Map.size;
      generateRow(table_5Map,tableDet[1],tableDet[2],updatedPrice,itemsQuantity, serialNo, "popup5Bill", itemName, itemPrice);
    }
    // If it is present in map
    else {
      // Updating the quantity of already added item in map
      table_5Map.set(itemName, [itemPrice, table_5Map.get(itemName)[1] + 1]);
      updateInput(table_5Map, "popup5" , itemName );
    }
  }

  // ev.target.appendChild(document.getElementById(data));
}

// Drop function End



// JavaScript of popup Start

const closeBtn1 = document.getElementById("close-btn1");
const closeBtn2 = document.getElementById("close-btn2");
const closeBtn3 = document.getElementById("close-btn3");
const closeBtn4 = document.getElementById("close-btn4");
const closeBtn5 = document.getElementById("close-btn5");

const popup1 = document.getElementById("popup1");
const popup2 = document.getElementById("popup2");
const popup3 = document.getElementById("popup3");
const popup4 = document.getElementById("popup4");
const popup5 = document.getElementById("popup5");

const overlay = document.createElement("div");
overlay.classList.add("overlay");

overlay.addEventListener("click", () => {
  popup1.classList.remove("show");
  popup2.classList.remove("show");
  popup3.classList.remove("show");
  popup4.classList.remove("show");
  popup5.classList.remove("show");
  overlay.classList.remove("show");
});

// JavaScript of popup End


// Map table & popup
let popupTable = new Map();
popupTable.set("table-1", "popup1");
popupTable.set("table-2", "popup2");
popupTable.set("table-3", "popup3");
popupTable.set("table-4", "popup4");
popupTable.set("table-5", "popup5");



// Making header for all table
Array.from(tableItemsBoxes).forEach((tableItemBox) => {
  const tableName = tableItemBox.children[0].children[0].textContent;
  const tableId = tableItemBox.children[0].id;
  makeHeaderForPopup(tableName, tableId);
});



// Function to make header for table
function makeHeaderForPopup(tableName, tableId) {
  let popupId = popupTable.get(tableId);
  let popup = document.getElementById(popupId);

  // Making header for the targeted table
  let tableHolderDiv = document.createElement("div");
  let tableHolder = document.createElement("table");
  tableHolder.className = "billTable";
  tableHolder.id = `${popupId}Bill`;
  let tableHeader = document.createElement("h2");
  tableHeader.textContent = `${tableName} | Order Details`;
  tableHeader.className = "tableHeader";

  // Header row for specific item
  let headerRow = document.createElement("tr");
  headerRow.className = "headerRow";

  let serialNo = document.createElement("td");
  serialNo.textContent = "S.No";
  let item = document.createElement("td");
  item.textContent = "Item";
  let price = document.createElement("td");
  price.textContent = "Price";


  // TotalBill element for popup
  let totalBill = document.createElement("h4");
  totalBill.id = `${popupId}TableBill` ;
  totalBill.className = "totalBillText" ; 
  totalBill.textContent  = "Total: ";


  // Creating checkout button for all table which will have id as `${tableId}Btn` like: table-1Btn 
  let checkoutBtn = document.createElement("button");
  // Adding class to style the button for all table
  checkoutBtn.className = "checkoutBtn"; 
  checkoutBtn.textContent = "GENERATE BILL";
  checkoutBtn.id = `${tableId}CheckoutBtn`;

  headerRow.append(serialNo);
  headerRow.append(item);
  headerRow.append(price);

  tableHolder.append(headerRow);
  tableHolderDiv.append(tableHeader);
  tableHolderDiv.append(tableHolder);
  tableHolderDiv.append(totalBill) ; 
  tableHolderDiv.append(checkoutBtn) ; 
  popup.append(tableHolderDiv);

}



// Function to make row for table
function generateRow(tableMap,totalPriceOnTable, totalQuantityOnTable,tablePrice,itemsQuantity, serialNo, popupBill, itemName, itemPrice) {
  // console.log("generate row !!");
  let popupBillId = document.getElementById(popupBill);
  let popupBillTableId = popupBillId.parentNode.children[1].id;

  // Creating row & its data
  let currItemRow = document.createElement("tr");
  currItemRow.className = "currItemRow";

  let currItemSerialNo = document.createElement("td");
  currItemSerialNo.textContent = serialNo;

  let currItemName = document.createElement("td");
  currItemName.textContent = itemName;

  let currItemPrice = document.createElement("td");
  currItemPrice.textContent = itemPrice;

  let currItemQuantity = document.createElement("td");
  let currItemQuantityInput = document.createElement("input");
  currItemQuantityInput.setAttribute("placeholder", "Number of Servings");
  currItemQuantityInput.setAttribute("type", "number");
  currItemQuantityInput.setAttribute("min", 0);
  currItemQuantityInput.required = true ;
  currItemQuantity.append(currItemQuantityInput);

  // Updating the input value 
  currItemQuantityInput.value = tableMap.get(currItemName.textContent)[1] ;

  // Targeting the popuoBillText element
  let popupBillText = document.getElementById(`${popupBillId.id.slice(0,6)}TableBill`) ; 


  // Adding event listener if input field changes then, update the map & popupbox
  currItemQuantityInput.addEventListener("input" , (event) => {
    let updatedInputValue = parseInt(event.target.value) ; 
    // If the input value = 0 then, delete the current row
    if(updatedInputValue == 0){ currItemRow.remove();}
    // Updating the map according to itemName & it's value on input change
    tableMap.set(itemName , [itemPrice,updatedInputValue]);
    // Update the bill on popup
    popupBillText.textContent = `Total: ${totalBillForCurrentTable(tableMap)}` ; 

  })

  let currItemDeleteBtn = document.createElement("td");
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";

  // Adding event listener to remove the currItemRow
  deleteBtn.addEventListener("click", () => {
    // Update on tableCard
    totalPriceOnTable.textContent = `Rs: ${tablePrice-itemPrice}`;
    totalQuantityOnTable.textContent = `Total items: ${itemsQuantity-1}`;

    // Update in map
    updateMap(popupBillTableId, currItemName.textContent);

    // Update the bill on popup
    popupBillText.textContent = `Total: ${totalBillForCurrentTable(tableMap)}` ; 

    currItemRow.remove();
    // Update the serial no
    updateSerialOnDeletion(popupBillTableId);
  });

  let deleteBtnImg = document.createElement("img");
  deleteBtnImg.setAttribute("width", "18px");
  deleteBtnImg.setAttribute(
    "src",
    "https://cdn1.iconfinder.com/data/icons/materia-basic-vol-1/24/009_007_trash_box_recycle_delete-512.png"
  );
  deleteBtnImg.setAttribute("alt", "Loading image");
  deleteBtn.append(deleteBtnImg);
  currItemDeleteBtn.append(deleteBtn);

  currItemRow.append(currItemSerialNo);

  currItemRow.append(currItemName);
  currItemRow.append(currItemPrice);
  currItemRow.append(currItemQuantity);
  currItemRow.append(currItemDeleteBtn);

  popupBillId.append(currItemRow);
}



// Function to update the map on deletion operation
function updateMap(popupBillTableId, currItemName) {
  if (popupBillTableId === "popup1Bill") {
    table_1Map.delete(currItemName);
  } else if (popupBillTableId === "popup2Bill") {
    table_2Map.delete(currItemName);
  } else if (popupBillTableId === "popup3Bill") {
    table_3Map.delete(currItemName);
  } else if (popupBillTableId === "popup4Bill") {
    table_4Map.delete(currItemName);
  } else {
    table_5Map.delete(currItemName);
  }
}


// Function to update the quantity of items in popupTable 

function updateInput(tableMap, popupName, itemName){
  let popupId = document.getElementById(popupName);
  console.log(popupId);
  let popupTable = popupId.children[1].children;
  // Iterating over child of popupTable to find row which has text content value as itemName
  for(let child = 0; child < popupTable.length;child++){
    let tableRows = popupTable[child].children;
    // Finding Row which has text content value as itemName
    for(let tableRow =0;tableRow < tableRows.length;tableRow++){
      if(tableRows[tableRow].children[1].textContent == itemName){
        tableRows[tableRow].children[3].children[0].value= tableMap.get(itemName)[1];
      }
    }
  }
}



// Function to update the serialNo of item in popup on if any deletion 
function updateSerialOnDeletion(popupBillTableId){
let tableRows = document.getElementById(popupBillTableId).children ; 
  // Taking counter to update the serialNo in popup table
  let serialNo = 1; 
  for(let tableRow = 1;tableRow < tableRows.length ; tableRow++){
    // Updating the serialNo according to the curr serialNo counter 
    tableRows[tableRow].children[0].textContent = serialNo ;
    serialNo ++ ; 
  }
}



// Function to checkout the specific table
function checkoutTable (popup , tableCheckOutBtn ,  popupBillElementId ,  tableMap , tableCardPrice , tableCardQuantity) {
  let popupBillElement = document.getElementById(popupBillElementId);
  console.log(popupBillElement) ; 
  let tableCheckOutBtnElement = document.getElementById(tableCheckOutBtn) ; 
      // Adding eventlistener to final checkout which will be called on btn click
      tableCheckOutBtnElement.addEventListener("click" , ()=>{
        popup.innerHTML= "" ; 
        tableCardPrice.textContent = "Rs: 0";
        tableCardQuantity.textContent = "Total items: 0"; 
        popup.classList.remove("show");
        overlay.classList.remove("show");
  }) ;  

  popupBillElement.textContent = `Total: ${totalBillForCurrentTable(tableMap)}` ;
  console.log("checkoutbtn") ;  

}

// function to calculate the total price for table
function totalBillForCurrentTable(tableMap)
{
  let totalBillAmount = 0;
  for (let [key, value] of tableMap ) {
    let totalAmountItem = value[0]*value[1] ; 
    totalBillAmount+= (totalAmountItem) ; 
  }
  return totalBillAmount ; 
}



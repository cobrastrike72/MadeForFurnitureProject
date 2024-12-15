import { persons as originalPersons } from "./data.js";
import { originalOrders as initialOrders, originalOrders } from "./data.js";

let activeUser = JSON.parse(localStorage.getItem("Active User"));
if (activeUser.role == null || activeUser.role == "Guest") {
    location = "../home.html";
}

if (localStorage.getItem("Persons") == null) {
    let plainPersons = originalPersons.map((item) => item.getPerson());
    localStorage.setItem("Persons", JSON.stringify(plainPersons));
    // console.log(JSON.parse(localStorage.getItem("Persons")));
}
let persons = JSON.parse(localStorage.getItem("Persons"));


// print order table
if (localStorage.getItem("originalOrders") == null) {
    localStorage.setItem("originalOrders", JSON.stringify(initialOrders));
}
let orders = JSON.parse(localStorage.getItem("originalOrders"));
let usersOrders = [];
for (let i = 0; i < orders.length; i++) {
    if (orders[i].customerId == activeUser.id) {
        usersOrders.push(orders[i]);
    }
}

let products = JSON.parse(localStorage.getItem("products"));

function breakOrdersIntoProducts(ordersRow) {
    let target = [];
    let productsId = ordersRow["products"];
    let productsIndices = [];

    for (let i = 0; i < productsId.length; i++) {
        productsIndices.push(products.findIndex(product => product.id == productsId[i]));
    }

    for (let i = 0; i < ordersRow["products"].length; i++) {
        let result = { id: ordersRow["id"], product: products[productsIndices[i]], quantity: ordersRow["quantities"][i], date: ordersRow["date"], status: ordersRow["status"] }
        target.push(result);
    }
    return target;
 }
function createTableOrders() {
    let myTable = document.getElementById("myTable");
    let tableHeader = document.getElementsByTagName("thead")[0];
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableHeader.innerHTML = `<th>ID</th> <th>Product</th> <th>Quantity</th>  <th>Unit Price</th> <th>Subtotal</th><th>Total</th> <th>Date</th> <th>Status</th>`
    tableBody.innerHTML = "";

    for (let i = 0; i < usersOrders.length; i++) {
        let tableBody = document.getElementsByTagName("tbody")[0];
        let result = breakOrdersIntoProducts(usersOrders[i]);
        
        for (let j = 0; j < result.length; j++) {
            let tableRow = document.createElement("tr");
            let id = result[j]["id"];
            let productName = result[j]["product"].name;
            let quantity = result[j]["quantity"];
            let date = result[j]["date"];
            let status = result[j]["status"];
            // let customerId = orders[i]["customerId"];
            let unitPrice = result[j]["product"].price;
            let tableData = document.createElement("td");
            if (j == 0) {
                tableData.innerHTML = id;
                tableData.setAttribute("rowspan", result.length);
                tableRow.appendChild(tableData);
            }
            tableData = document.createElement("td");
            tableData.innerHTML = productName;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = quantity;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerHTML = unitPrice + " $";
            tableRow.appendChild(tableData);
            let totalPrice = unitPrice * quantity;
            tableData = document.createElement("td");
            tableData.innerHTML = totalPrice + " $";
            tableRow.appendChild(tableData);
            if (j == 0) {
                let sum = 0;
                for (let k = 0; k < result.length; k++) {
                    sum += result[k]["product"].price * result[k]["quantity"];
                }
                tableData = document.createElement("td");
                tableData.setAttribute("rowspan", result.length);
                tableData.innerHTML = sum + " $";
                tableData.classList.add("fs-5", "fw-bold", "text-success");
                tableRow.appendChild(tableData);

                tableData = document.createElement("td");
                tableData.innerHTML = date;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("fw-bold");
                tableRow.appendChild(tableData);
                tableData = document.createElement("td");
                tableData = document.createElement("td");
                tableData.innerHTML = status;
                tableData.setAttribute("rowspan", result.length);
                tableData.classList.add("fw-bold");
                tableData.classList.add("text-uppercase");
                if (status == "delivered") {
                    tableData.classList.add("text-white");
                    tableData.classList.add("bg-success");
                    tableRow.appendChild(tableData);
                }
                else if (status == "shipped") {
                    tableData.classList.add("bg-warning");
                    tableRow.appendChild(tableData);
                }
                else {
                    tableData.classList.add("text-white");
                    tableData.classList.add("bg-danger");
                    tableRow.appendChild(tableData);
                }
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
        myTable.appendChild(tableBody);
    }
};
let tableHeader = document.getElementById('tableHeader');
if (usersOrders.length > 0) { 
    tableHeader.innerText = `Welcome ${activeUser.name} your history orders and their status are below`;
    console.log(activeUser);
    createTableOrders(); }
else{
    tableHeader.innerText = `Welcome ${activeUser.name}: you haven't made any orders yet (no order history for you)!`;
}    

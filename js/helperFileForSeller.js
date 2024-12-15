// Importing necessary modules and data
import { Person } from "./database.js"; // Import Person class (not used in this snippet)
import { products as originalProducts, persons as originalPersons } from "./database.js"; // Import initial data for products and persons
import { Product } from "./database.js" // Import Product class (not used in this snippet)
import { orders } from "./database.js" // Import orders data

// Authenticates that the current user is a "Seller", otherwise redirects to the home page
if (JSON.parse(localStorage.getItem("Active User")).role != "Seller") {
    alert("You are not authorized to access this page.")
    window.location.href = "../home.html"; // Redirect if the user is not a seller
}

// Checks if "Persons" and "products" are already stored in localStorage, if not, it stores them
if (localStorage.getItem("Persons") == null) {
    let plainPersons = originalPersons.map((item) => item.getPerson()); // Extracts person data using the getPerson() method
    localStorage.setItem("Persons", JSON.stringify(plainPersons)); // Saves extracted person data to localStorage
}
if (localStorage.getItem("products") == null) {
    let plainProducts = originalProducts.map((item) => item.getProduct()); // Extracts product data using the getProduct() method
    localStorage.setItem("products", JSON.stringify(plainProducts)); // Saves extracted product data to localStorage
}

// Retrieves persons and products data from localStorage
let persons = JSON.parse(localStorage.getItem("Persons"));
let products = JSON.parse(localStorage.getItem("products"));

// References to sidebar and content elements in the DOM
let side_bar = document.getElementById("sidebar");
let content = document.getElementById("content");

// Function to separate and filter orders for the seller
function OrderForSeller(_array) { // that functions is mainly to separate the products in any order because one order could be shared between multiple orders
    let separatedOrders = []; // This array will store individual order details (it will contain the product for the seller in each order bc the order could be shared between multiple sellers)
    let OrderPerSeller = []; // This will store orders specific to the seller

    // Iterates through orders and separates them by product
    _array.forEach(order => {
        order._products_.forEach(product => {
            let individualOrder = {
                OrderID: order.orderId, // Order ID
                productId: product.id, // Product ID
                productName: product.name, // Product name
                productQuantity: product.quantity, // Quantity of the product in the order
                dateOrder: new Date(order.Order_date), // Order date
                dateDeliver: new Date(order.Delivered_date), // Delivery date
                status: order.status, // Order status
                customerId: order.customerId // Customer ID
            };
            separatedOrders.push(individualOrder); // Add the order to the array
        });
    });

    // Fetches the products related to the seller
    let SellerProduct = GetSellerProduct();
    
    // Filters orders specific to the seller's products
    separatedOrders.forEach(order => {
        SellerProduct.forEach(product => {
            if (order.productId == product.id) {
                OrderPerSeller.push(order); // Adds matching order to the seller's order list
            }
        });
    });

    // Modifies the order data to include customer name and total price
    let modifiedOrder = [];
    OrderPerSeller.forEach(order => {
        let individualOrder = {
            OrderID: order.OrderID, // Order ID
            productId: order.productId, // Product ID
            productName: order.productName, // Product name
            Quantity: order.productQuantity, // Quantity of the product
            dateOrder: order.dateOrder.toLocaleDateString(), // Formatted order date
            dateDeliver: order.dateDeliver.toLocaleDateString(), // Formatted delivery date
            status: order.status, // Order status
            customerName: persons.find(person => person.id == order.customerId).name, // Customer name based on customerId
            TotalPrice: order.productQuantity * (products.find(product => product.id == order.productId).price) // Calculating total price for the product
        };
        modifiedOrder.push(individualOrder); // Adds the modified order to the array
    });

    return modifiedOrder; // Returns the final list of modified orders
}

// Function to fetch all products belonging to the active seller
function GetSellerProduct() {
    let SellerProducts = []; // Array to store seller's products
    let activeUser = JSON.parse(localStorage.getItem("Active User")); // Retrieves the active user (seller)
    let SellerId = activeUser.id; // Gets the seller's ID
    SellerProducts = products.filter(item => item.sellerID == SellerId); // Filters products belonging to the seller
    return SellerProducts; // Returns the filtered products
}

// Function to toggle the sidebar's collapse state
function SideBarCollpse() {
    side_bar.classList.toggle("active"); // Toggles the "active" class for showing/hiding the sidebar
    side_bar.classList.toggle("col-lg-1"); // Adjusts the sidebar's width
    side_bar.classList.toggle("col-lg-2"); // Adjusts the sidebar's width
    content.classList.toggle("col-lg-10"); // Adjusts content width when sidebar is collapsed
    content.classList.toggle("col-lg-11"); // Adjusts content width when sidebar is collapsed
}

// Function to show the sidebar in a fixed width layout
function ShowSideBar() {
    side_bar.classList.toggle("show-nav"); // Toggles sidebar's visibility
    side_bar.classList.remove("col-lg-2"); // Removes the class that sets the width of the sidebar
    side_bar.classList.add("fixed-width"); // Adds a class for fixed width layout of the sidebar
    content.classList.toggle("col-lg-10"); // Adjusts content width
}

// Exporting functions to be used in other parts of the application
export { OrderForSeller, GetSellerProduct, SideBarCollpse, ShowSideBar }

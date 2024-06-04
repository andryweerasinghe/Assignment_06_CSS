import {orders,items,customers} from "../db/db.js";

$('#orders-section,#customers-section,#items-section').hidden();

$(document).ready(function(){
   $('.current-page-button').css({
       background: '#B05200',
       color: '#FFEEE2',
       padding: '18px 28px',
       border: '30px',
       text: 'none',
       font: '1000',
       cursor:'pointer'
   });
   $('.Orders,.Customers,.Items').css({
      cursor:'pointer',
   });
});

function updateTotalOrdersHome() {
    var total = orders.length;
    $('totalOrdersHome').text(total);
}

function updateTotalCustomersHome() {
    var total = customers.length;
    $('totalCustomersHome').text(total);
}

function updateTotalItemsHome() {
    var total = customers.length;
    $('totalItemsHome').text(total);
}

function updateTotalSales(){
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.amount;
    });
    $('#sales').text("Rs. " + totalSales + "/=");
}
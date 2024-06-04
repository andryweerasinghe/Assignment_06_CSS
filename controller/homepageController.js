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

$('nav-home-section').on('click', function(){
    const home = $('.current-page-button');
    const orders = $('.Orders');
    const customers = $('.Customers');
    const items = $('.Items');

    $('#home-section').show();
    $('#orders-section').hide();
    $('#customers-section').hide();
    $('#items-section').hide();

    function buttonStyling(button){
        button.css({
            background: 'none',
            color: '#B05200',
            padding: '18px 28px',
            border: '30px',
            text: 'none',
            font: '700',
            cursor: 'pointer'
        });
    }

    buttonStyling(orders);
    buttonStyling(customers);
    buttonStyling(items);

    function applyingHoverEffect(button){
        button.hover(function (){
            $(this).css({
                background: '#B05200',
                color: '#FEE5D4'
            });
        }, function (){
            $(this).css({
                background: 'none',
                color: '#B05200',
                padding: '18px 28px',
                border: '30px',
                text: 'none',
                font: '700'
            });
        });
    }

    applyingHoverEffect(orders);
    applyingHoverEffect(customers);
    applyingHoverEffect(items);
})
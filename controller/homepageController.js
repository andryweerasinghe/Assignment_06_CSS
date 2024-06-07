import {orders,items,customers} from "../db/db.js";
// export {loadOrderTableHome};

$('#orders-section,#customers-section,#items-section').hide();

$(document).ready(function(){
   $('.current-page-button').css({
       background: '#717d79',
       color: '#e7e9e9',
       padding: '18px 28px',
       border: '30px',
       text: 'none',
       font: '1000',
       cursor:'pointer'
   });
   $('.Orders,.Customers,.Items').css({
      cursor:'pointer'
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
    var total = items.length;
    $('totalItemsHome').text(total);
}

function updateTotalSales(){
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.amount;
    });
    $('#sales').text("Rs. " + totalSales + "/=");
}

$('#nav-home-section').on('click', function(){
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
            color: '#e7e9e9',
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
                background: '#717d79',
                color: '#e7e9e9'
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

    // The below hover function is used to keep the home button as same it is without getting overridden by the above functions
    $(home).hover(function (){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
    /*loadOrderTableHome();*/
    /*updateTotalCustomersHome();
    updateTotalItemsHome();
    updateTotalSales();
    updateTotalOrdersHome();*/
});

/*
function loadOrderTableHome(){
    $('#orders-summary').empty();

    orders.map((item, index) => {
        var orderRecord = `<tr>
            <td class="o-id">${item.orderID}</td>
            <td class="o-itemID">${item.itemID}</td>
            <td class="o-itemName">${item.ItemName}</td>
            <td class="o-qty">${item.orderQty}</td>
            <td class="o-order-date">${item.orderDate}</td>
            <td class="o-totalPrice">${item.totalPrice}</td>
        </tr>`
        $('#orders-summary').append(orderRecord);
    });
}*/

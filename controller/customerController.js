import {customers} from "../db/db.js";

$('#nav-customers-section').on('click',() => {
    const home = $('.current-page-button');
    const customers = $('.Customers');
    const orders = $('.Orders');
    const items = $('.Items');

    $('#home-section').hide();
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

    buttonStyling(home);
    buttonStyling(orders);
    buttonStyling(items);

    function applyingHoverEffect(button){
        button.hover(function () {
           $(this).css({
               background: '#B05200',
               color: '#FEE5D4'
           }) ;
        },function () {
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

    applyingHoverEffect(home);
    applyingHoverEffect(items);
    applyingHoverEffect(orders);

    $(customers).hover(function(){
        $(this).css({
            background: '#B05200',
            color: '#FEE5D4'
        });
    });
});

var validCustomerId = $('#customers-content-card-left>#txtCustomerID');
var validCustomerName = $('#customers-content-card-left>#txtName');
var validCustomerAddress = $('#customers-content-card-left>#txtAddress');
var validCustomerNo = $('#customers-content-card-left>#txtPhoneNumber');
var isValidPhoneNumber =
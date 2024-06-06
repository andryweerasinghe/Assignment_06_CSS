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
var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

$(validCustomerId).on("input", function (event) {
    $(validCustomerId).css({
        border: "2px solid #B05200"
    });
});

$(validCustomerName).on("input", function (event) {
    $(validCustomerName).css({
        border: "2px solid #B05200"
    });
});

$(validCustomerAddress).on("input", function (event) {
    $(validCustomerAddress).css({
        border: "2px solid #B05200"
    });
});

$(validCustomerNo).on("input", function (event) {
    $(validCustomerNo).css({
        border: "2px solid #B05200"
    });
});

function clearAll(){
    var customerId = $('#txtCustomerID').val("");
    var customerName = $('#txtName').val("");
    var customerAddress = $('#txtAddress').val("");
    var customerNo = $('#txtPhoneNumber').val("");

    var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");
}
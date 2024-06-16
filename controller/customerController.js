import CustomerModel from "../model/CustomerModel.js";
import {customers} from "../db/db.js";
var recordIndexCustomers;

$('#nav-customers-section').on('click',() => {
    const home = $('.current-page-button');
    const customers = $('.Customers');
    const orders = $('.Orders');
    const items = $('.Items');

    $('#home-section').hide();
    $('#orders-section').hide();
    $('#customers-section').show();
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

    buttonStyling(home);
    buttonStyling(orders);
    buttonStyling(items);

    function applyingHoverEffect(button){
        button.hover(function () {
           $(this).css({
               background: '#717d79',
               color: '#e7e9e9'
           }) ;
        },function () {
            $(this).css({
                background: 'none',
                color: '#e7e9e9',
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
            background: '#717d79',
            color: '#e7e9e9'
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

}

function emptyPlaceHolder(){
    $(validCustomerId).attr("placeholder", "");
    $(validCustomerName).attr("placeholder", "");
    $(validCustomerAddress).attr("placeholder", "");
    $(validCustomerNo).attr("placeholder", "");
}

function validCustomer(){
    var customerId = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('txtPhoneNumber').val();

    var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");

    if (customerId === ""){
        $(validCustomerId).css({
          border: "3px solid red"
        });
        $(validCustomerId).attr("placeholder", "ID Empty");
        $(validCustomerId).addClass('red');
    }

    if (!isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {

        $(ValidCustomerName).css({
            border: "3px solid red"
        });
        $(ValidCustomerAddress).css({
            border: "3px solid red"
        });
        $(ValidCustomerPhoneNumber).css({
            border: "3px solid red"
        });

        $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerAddress).attr("placeholder", "Wrong Input Try Again");
        $(ValidCustomerPhoneNumber).attr("placeholder", "Wrong Input Try Again");

        $(ValidCustomerName).addClass('red');
        $(ValidCustomerAddress).addClass('red');
        $(ValidCustomerPhoneNumber).addClass('red');

    }  else {

        $(ValidCustomerID).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerName).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerAddress).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerPhoneNumber).css({
            border: "2px solid #B05200"
        });

        emptyPlaceHolder();
    }
}

function totalCustomers() {
    var total = customers.length;
    $('#count').text(total);
}

$('#btnClearAll-customer').on('click',() => {
    clearAll();
});

function loadCustomerTable() {
    $("#customers-table-tb").empty();

    customers.map((item,index) => {
        var customerRecord = `<tr>
                        <td class="c-id">${item.id}</td>
                        <td class="c-name">${item.name}</td>
                        <td class="c-address">${item.address}</td>
                        <td class="c-phoneNumber">${item.phoneNumber}</td>
                    </tr>`
        $('#customers-table-tb').append(customerRecord);
    });
}

$('#customers-table-tb').on('click','tr',function () {
    recordIndexCustomers = $(this).index();

    var id = $(this).find(".c-id").text();
    var name = $(this).find(".c-name").text();
    var address = $(this).find(".c-address").text();
    var phoneNumber = $(this).find(".c-phoneNumber").text();

    $('#txtCustomerID').val(id);
    $('#txtName').val(name);
    $('#txtAddress').val(address);
    $('#txtPhoneNumber').val(phoneNumber);
});

$('#addCustomers').on('click', () => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || customerName === "" || customerAddress === "" || !isValidPhoneNumber.test(phoneNumber)) {
        validCustomer();
        return;
    }
    let customerModel = new CustomerModel(customerID,customerName,customerAddress,phoneNumber);
    customers.push(customerModel);

    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnDelete-customer').on('click',() => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || customerName === "" || customerAddress === "" || phoneNumber === "") {
        validCustomer();
        return;
    }

    customers.splice(recordIndexCustomers,1);
    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

$('#btnUpdate-customer').on('click',() => {

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || customerName === "" || customerAddress === "" || phoneNumber === "") {
        validCustomer();
        return;
    }

    var cOb = customers[recordIndexCustomers];
    cOb.id = customerID;
    cOb.name = customerName;
    cOb.address = customerAddress;
    cOb.phoneNumber = phoneNumber;

    emptyPlaceHolder();
    loadCustomerTable();
    clearAll();
    totalCustomers();
});

function searchCustomers(query) {
    const searchTerm = query.toLowerCase();

    for (let i = 0; i < customers.length; i++) {
        if (searchTerm === customers[i].id.toLowerCase() || searchTerm === customers[i].phoneNumber.toLowerCase()) {
            $('#txtCustomerID').val(customers[i].id);
            $('#txtName').val(customers[i].name);
            $('#txtAddress').val(customers[i].address);
            $('#txtPhoneNumber').val(customers[i].phoneNumber);
            break;
        }
    }
}

$('#search-customer').on('click', function() {
    const searchQuery = $('#txtSearch-customers').val();
    searchCustomers(searchQuery);
});
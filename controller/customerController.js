import CustomerModel from "/model/customerModel.js";
import {customers} from "../db/db.js";
var recordIndexCustomers;

$('#nav-customers-section').on('click',() => {

    loadCustomerTable();

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
        border: "2px solid #122620"
    });
});

$(validCustomerName).on("input", function (event) {
    $(validCustomerName).css({
        border: "2px solid #122620"
    });
});

$(validCustomerAddress).on("input", function (event) {
    $(validCustomerAddress).css({
        border: "2px solid #122620"
    });
});

$(validCustomerNo).on("input", function (event) {
    $(validCustomerNo).css({
        border: "2px solid #122620"
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

        $(validCustomerName).css({
            border: "3px solid red"
        });
        $(validCustomerAddress).css({
            border: "3px solid red"
        });
        $(validCustomerNo).css({
            border: "3px solid red"
        });

        $(validCustomerName).attributes("placeholder", "Wrong Input Try Again");
        $(validCustomerAddress).attributes("placeholder", "Wrong Input Try Again");
        $(validCustomerNo).attributes("placeholder", "Wrong Input Try Again");

        $(validCustomerName).autoAddCss('red');
        $(validCustomerAddress).autoAddCss('red');
        $(validCustomerNo).autoAddCss('red');

    }  else {

        $(validCustomerId).css({
            border: "2px solid #122620"
        });
        $(validCustomerName).css({
            border: "2px solid #122620"
        });
        $(validCustomerAddress).css({
            border: "2px solid #122620"
        });
        $(validCustomerNo).css({
            border: "2px solid #122620"
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

    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200 || http.status === 201){
                const customers = JSON.parse(http.responseText);
                console.log(customers);

                customers.map((item,index) => {
                    var customerRecord = `<tr>
                        <td class="c-id">${item.id}</td>
                        <td class="c-name">${item.name}</td>
                        <td class="c-address">${item.address}</td>
                        <td class="c-phoneNumber">${item.phoneNumber}</td>
                    </tr>`
                    $('#customers-table-tb').append(customerRecord);
                });
            } else {
                console.log("Failed to load customers");
                console.log("Status Code", http.status);
                console.log("ready state" + http.readyState);
            }
        } else {
            console.log("Processing Stage : Stage ", http.readyState);
        }
    }
    http.open("GET", "http://localhost:8080/POS_System/customerController", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
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

$('#addCustomers').click(function(){
    event.preventDefault();

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    // if (customerID === "" || customerName === "" || customerAddress === "" || !isValidPhoneNumber.test(phoneNumber)) {
    //     validCustomer();
    //     return;
    // }
    const customerData = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        phoneNumber: phoneNumber
    };

    console.log(customerData);
    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);
    /*save data with AJAX*/
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200 || http.status === 201) {
                const jsonObject = JSON.stringify(http.responseText);
                loadCustomerTable();
            } else {
                console.log("Failed");
                console.log("Status Code", http.status);
                console.log("ready state" + http.readyState);
            }
        } else {
            console.log("Processing Stage : Stage ", http.readyState);
        }
    }
    http.open("POST", "http://localhost:8080/POS_System/customerController", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(customerJSON);
    // let customerModel = new CustomerModel(customerID,customerName,customerAddress,phoneNumber);
    // customers.push(customerModel);

    emptyPlaceHolder();
    clearAll();
    totalCustomers();
});

$('#btnDelete-customer').on('click',() => {
    event.preventDefault();

    const customerID = $('#txtCustomerID').val();

    if (!customerID){
        validCustomer();
        return;
    }
    //creating an object ***When creating an object make sure the left side has the names of the columns in the table itself***
    // const customerData = {
    //     id: customerID
    // };

    // console.log(customerData);
    //
    // const customerJSON = JSON.stringify(customerData);
    // console.log(customerData);
    // const customerJSON = JSON.stringify(customerData);
    $.ajax({
        url: 'http://localhost:8080/POS_System/customerController?customerID=' + customerID,
        type: 'DELETE',
        success: function(res)  {
            console.log(JSON.stringify(res));
            loadCustomerTable();
            console.log("Customer Deleted");
        },
        error: (res) => {
            console.error(res);
            console.log("Customer Not Deleted");
        }
    });
    // const http = new XMLHttpRequest();
    // http.onreadystatechange = () => {
    //     if (http.readyState === 4) {
    //         if (http.status === 200 || http.status === 201 || http.status === 204) {
    //             const jsonObject = JSON.stringify(http.responseText);
    //             loadCustomerTable();
    //         } else {
    //             console.log("Failed");
    //             console.log("Status Code", http.status);
    //             console.log("ready state" + http.readyState);
    //         }
    //     } else {
    //         console.log("Processing Stage : Stage ", http.readyState);
    //     }
    // }
    // http.open("DELETE", "http://localhost:8080/POS_System/customerController?customerId=", true);
    // http.setRequestHeader("Content-type", "application/json");
    // http.send(customerJSON);

    customers.splice(recordIndexCustomers,1);
    emptyPlaceHolder();
    clearAll();
    totalCustomers();
});

$('#btnUpdate-customer').on('click',() => {
    event.preventDefault();

    var customerID = $('#txtCustomerID').val();
    var customerName = $('#txtName').val();
    var customerAddress = $('#txtAddress').val();
    var phoneNumber = $('#txtPhoneNumber').val();

    if (customerID === "" || customerName === "" || customerAddress === "" || phoneNumber === "") {
        validCustomer();
        return;
    }

    const customerData = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        phoneNumber: phoneNumber
    };

    console.log(customerData);

    const customerJSON = JSON.stringify(customerData);
    console.log(customerJSON);
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if (http.readyState === 4) {
            if (http.status === 200 || http.status === 201 || http.status === 204) {
                const jsonObject = JSON.stringify(http.responseText);
                loadCustomerTable();
            } else {
                console.log("Failed");
                console.log("Status Code", http.status);
                console.log("ready state" + http.readyState);
            }
        } else {
            console.log("Processing Stage : Stage ", http.readyState);
        }
    }
    http.open("PUT", "http://localhost:8080/POS_System/customerController", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(customerJSON);

    // var cOb = customers[recordIndexCustomers];
    // cOb.id = customerID;
    // cOb.name = customerName;
    // cOb.address = customerAddress;
    // cOb.phoneNumber = phoneNumber;

    emptyPlaceHolder();
    clearAll();
    totalCustomers();
});

$('#search-customer').on('click', function() {
    const searchQuery = $('#txtSearch-customers').val();
    const encodedQuery = encodeURIComponent(searchQuery);
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        console.log("Processing Stage: Stage", http.readyState);

        if (http.readyState === 4) {
            console.log("Status Code", http.status);
            console.log("Response Text:", http.responseText);

            if (http.status === 200) {
                try {
                    const jsonObject = JSON.parse(http.responseText);

                    if (jsonObject) {
                        $('#txtCustomerID').val(jsonObject.id);
                        $('#txtName').val(jsonObject.name);
                        $('#txtAddress').val(jsonObject.address);
                        $('#txtPhoneNumber').val(jsonObject.phoneNumber);
                        console.log("Text fields updated successfully.");
                    } else {
                        console.log("No customer data returned.");
                    }
                } catch (error) {
                    console.log("Error parsing JSON response:", error);
                }
            } else {
                console.log("Failed with status code:", http.status);
            }
        }
    };
    http.open("GET", `http://localhost:8080/POS_System/customerController?searchTerm=${encodedQuery}`, true);
    http.send();
});
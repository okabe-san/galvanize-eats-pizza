$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'https://galvanize-eats-api.herokuapp.com/menu'
  }).done(function(data) {
    // console.log(data);
    menuList(data);
    selectItem(data);
    addItem(data);
    //subTotal(data);
  });
});

let item = '';
let subTotal = 0;

function menuList(data) {
  var menuArr = data.menu;
  for (var info in menuArr) {
    // console.log(menuArr[info]);
    var name = menuArr[info].name;
    var value = menuArr[info].price;
    var type = menuArr[info].type;
    if (type === 'burger') {
        $('.menuBurgers').append('<p class="select">' + name + ': Price: $' + value + '</p><br>');
    } else if (type === 'pizza') {
        $('.menuPizza').append('<p class="select">' + name + ': Price: $' + value + '</p><br>');
    }
  }
}

function selectItem(data) {
  $('.menu p').on('click', function () {
    item = this.cloneNode(true);
    $(this).css('border-color', 'gray');
    $('.select').not(this).css('border-color', 'transparent');
    // console.log(item);
  });
}

function addItem(data) {
  $('.addItem').on('click', function(el) {
    el.preventDefault();
    var count = $('.quantity').val();
    for (var i = 0; i < count; i++) {
      // console.log(item.innerHTML);
      $('.orderList').append('<h5>' + item.innerHTML + '</h5>');
      var price =
      parseFloat(item.innerHTML.substring(item.innerHTML.indexOf('$')+1));
      subTotal += price;
    }
    var tax = (subTotal * 0.08);
    var total = (parseFloat(subTotal) + parseFloat(tax));
    $('.price').empty();
    $('.price').append('<br><br><p>Sub Total: $' + (subTotal).toFixed(2) + '</p>');
    $('.price').append('<p>Tax (8%): $' + (tax).toFixed(2) + '</p>');
    $('.price').append('<h4>Grand Total: $' + (total).toFixed(2) + '</h4>');
  });
}


function orderInfo() {
  order[name] = $('#name').val();
  order[phone] =$('#phone').val();
  order[address] =$('#address').val();
}

$('.submit').on('click', function() {
  orderInfo();
  $.ajax({
    type: "POST",
    url: 'https//galvanize-eats-api.herokuapp.com/order',
    data: order
  }).done(function(data) {
    console.log(data);
    alert ('Your food is on its way!');
  });
});

// add scripts
console.log('sanity check!');

var order = {};

$(document).ready(function () {
    $.ajax({
      type: 'GET',
      url: 'https://galvanize-eats-api.herokuapp.com/menu'
    }).done(function(data) {
      console.log(data);
      var menuArr = data.menu;
      for (var info in menuArr) {
        // console.log(menuArr[info]);
        var name = menuArr[info].name;
        var value = menuArr[info].price;
        var type = menuArr[info].type;
        if (order === undefined) {
          order[name] = value;
        }
        if (type === 'burger') {
            $('.menuBurgers').append(name + 'Price' + value + '<br>');
        } else if (type === 'pizza') {
            $('.menuPizza').append(name + 'Price' + value + '<br>');
        }
        return order;
      }
    });
});

console.log(order);
function select(element) {
  $('.orderList').append('hi');
}

function addToCart(id, itemName, itemValue) {
    console.log("adding budget");
    var sCartList = sessionStorage.getItem("cartList");
    var cartList = [];
    // first time adding budget
    if (sCartList !== null) {
        cartList = JSON.parse(sCartList);
    }
    var itemQuantity = Number(document.getElementById(id).value);
    var itemExist = false;
    var cartItemsLenght = 0;
    cartList.forEach(function (e) {
        if (e.name === itemName) {
            e.quantity += itemQuantity;
            itemExist = true;
        }
        cartItemsLenght += e.quantity;
    });
    if ((itemExist === false)) {
        var item = { name: itemName, price: Number(itemValue), quantity: itemQuantity };
        cartItemsLenght += itemQuantity;
        cartList.push(item);
    }
    // update cart 
    document.getElementById('cartItemsCount').innerHTML = cartItemsLenght.toString();
    sessionStorage.setItem('cartList', JSON.stringify(cartList));
}
function removeData() {
    var canDelete = confirm("Are you sure you want to delete the data?");
    if (canDelete) {
        sessionStorage.removeItem("cartList");
        localStorage.removeItem("cartList");
    }
}
function displayData() {
    var tableHeader = "<table class='table table-striped'>  \
                            <thead class='table-bisque'>    \
                                <tr>                        \
                                    <th>Name</th>    \
                                    <th>Price</th>    \
                                    <th>Quantity</th>   \
                                    <th>Total</th>         \
                                </tr>                       \
                            </thead>                        ";
    var tableBody = "";
    var endTable = "</table>";
    var sCartList = sessionStorage.getItem("cartList");
    var cartList = JSON.parse(sCartList);
    console.log(cartList);
    //check if project list is empty , return if empty
    if (cartList === null) {
        document.getElementById('tableDiv').innerHTML = "<div style='color:black'>No data to display";
        return;
    }
    var cartSum = 0;
    cartList.forEach(function (element) {
        console.log(element);
        var name = element.name, price = element.price, quantity = element.quantity;
        var totalPrice = price * quantity;
        cartSum += totalPrice;
        tableBody += "<tr><td>" + name + "</td><td>" + price + "</td> <td> " + quantity + " </td><td>  $" + totalPrice + " </td></tr>";
    });
    var table = tableHeader + tableBody + endTable;
    document.getElementById('tableDiv').innerHTML = table;
    document.getElementById('tableDiv').innerHTML += "<div style='color:black'> Sum: " + cartSum + " </div>";
    console.log(cartSum);
}


interface i_item{
    name:string,
    price:number,
    quantity:number
}

function addToCart(id:string, itemName:string, itemValue:string) :void {
    console.log("adding budget");

    let sCartList:string = sessionStorage.getItem("cartList");




    let cartList: i_item[] = [];
    // first time adding budget
    if(sCartList !== null){
        cartList = JSON.parse(sCartList);
    }

    let itemQuantity:number = Number( (document.getElementById(id) as HTMLInputElement).value);
    let itemExist:boolean = false;
    let cartItemsLenght : number =0;
    cartList.forEach(e => {
        if(e.name === itemName){
            e.quantity += itemQuantity;
            itemExist = true;
        }
        cartItemsLenght += e.quantity;
    });

    if((itemExist === false)!){
        let item:i_item = {name:itemName, price: Number(itemValue),quantity:itemQuantity  }
        cartItemsLenght += itemQuantity;
        cartList.push(item);
    }

    // update cart 
    document.getElementById('cartItemsCount').innerHTML = cartItemsLenght.toString();


    sessionStorage.setItem('cartList', JSON.stringify(cartList));
}

function removeData() {
    let canDelete = confirm("Are you sure you want to delete the data?");
    if(canDelete){
        sessionStorage.removeItem("cartList");
        localStorage.removeItem("cartList");
    }

}

function displayData() {

    let tableHeader:string = "<table class='table table-striped'>  \
                            <thead class='table-bisque'>    \
                                <tr>                        \
                                    <th>Name</th>    \
                                    <th>Price</th>    \
                                    <th>Quantity</th>   \
                                    <th>Total</th>         \
                                </tr>                       \
                            </thead>                        "


    let tableBody:string  = "";
    let endTable:string ="</table>"

    let sCartList = sessionStorage.getItem("cartList");
    let cartList:i_item[]  = JSON.parse(sCartList);
    console.log(cartList);
    
    //check if project list is empty , return if empty
    if(cartList === null){
        document.getElementById('tableDiv').innerHTML = "<div style='color:black'>No data to display";
        return;
    }

    let cartSum = 0;
    cartList.forEach(element => {
        console.log(element)
        let {name, price, quantity} = element;
        let totalPrice = price * quantity;
        cartSum += totalPrice;
        tableBody += `<tr><td>${name}</td><td>${price}</td> <td> ${quantity} </td><td>  $${totalPrice} </td></tr>`
        
    });

    let table:string = tableHeader + tableBody + endTable;
    document.getElementById('tableDiv').innerHTML = table;
    document.getElementById('tableDiv').innerHTML += "<div style='color:black'> Sum: " + cartSum + " </div>";

    console.log(cartSum);
}
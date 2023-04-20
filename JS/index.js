
/*all the code after this comment is used to make the
shopping cart interactive*/

//this is the JavaScript for the shopping cart
let cartIcon = document.querySelector("#cartIcon");
let cartSideBar = document.querySelector(".cartSideBar");
let closeSideBar = document.querySelector("#closeSideBar");

//code to open the side bar 
cartIcon.onclick = () =>{
  cartSideBar.classList.add("active");
};
//code to close the side bar
closeSideBar.onclick = () =>{
  cartSideBar.classList.remove("active");
};


//code to make the shopping cart functional
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Function for cart
  function ready() {
    //remove items from the shopping cart
      var removeCartButton = document.getElementsByClassName('item-removal');
      console.log(removeCartButton);
      for(var i = 0; i < removeCartButton.length; i++){
        var button = removeCartButton[i]
        button.addEventListener('click' , removeCartItem)
      }

      //add item to cart
      var addCart = document.getElementsByClassName('add-cart');
      for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
      }

      //JS for the buy button to work
      document.getElementsByClassName('buyButton')[0].addEventListener('click', buyButtonClicked);
    }

    //buy Button
    function buyButtonClicked(){
      alert('Your Order is Placed');
      var cartContent = document.getElementsByClassName('cartContents')[0]
      while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
      }
      updateTotal();
    }

  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  }


  //Change the quanity
  var quantityInputs = document.getElementsByClassName('cartQuant');
  for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  //quantity changes
  function quantityChanged (event){
    var input = event.target;
    if(isNaN(input.value) || input.value < 0){
      input.value = 1
    } 
    updateTotal();
  }

  //add to cart
  function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-name')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImage = shopProducts.getElementsByClassName('procduct-img')[0].src;
    addProductToCart(title, price, productImage);
    updateTotal();
  }

  function addProductToCart(title, price, productImage){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cartItemsBox');
    var cartItems = document.getElementsByClassName('cartContents')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert('You have already added this item to the cart');         
            return;
        }
    }
  

    var cartBoxContent = `                
                  <img src="${productImage}" alt="" class="cart-img">
                  <div class="cart-info">
                      <div class="cart-item-title">${title}</div>
                      <div class="cart-item-price">${price}</div>
                    <input type="number" value="1" class="cartQuant">
                  </div>
                  <!--Option to remove Item from Cart-->
                  <i class="bx bxs-trash item-removal" ></i>
                `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
    .getElementsByClassName("item-removal")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox
    .getElementsByClassName("cartQuant")[0]
    .addEventListener("change", quantityChanged);
  }


  //update the total amount
  function updateTotal(){
      var cartContent = document.getElementsByClassName('cartContents')[0];
      var cartBoxes = cartContent.getElementsByClassName('cartItemsBox');
      var total = 0;
      for(var i = 0; i < cartBoxes.length; i++){
        var cartBox =  cartBoxes [i];
        var priceElement = cartBox.getElementsByClassName('cart-item-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cartQuant')[0];
        var price = parseFloat(priceElement.innerText.replace("€",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
      }
        //for cent value
        //total = math.round(total*100)/100;

        document.getElementsByClassName('cartTotal-price')[0].innerText = '€' + total;
      
  }
  

  /*to turn the shop-logo into a dropdow menu 
   for screens smaller than 480px*/

   const shopLogo = document.querySelector(".shop-logo");
   const headerNav = document.querySelector(".header-nav");
   
   shopLogo.addEventListener("click", function() {
  headerNav.classList.toggle("show-nav");
   });











/* This is the JavaScript for the interactive map*/

function initMap() {
  const myLatLng = { lat: 53.34893415315022, lng: -6.243159045271536 };
  const map = new google.maps.Map(document.getElementById("map"),{
    zoom: 15,
    center: myLatLng,
    disableDefaultUI: true
  });

  const contentString = "<p>Coffee Cafe Store<br/>Mayor Street Lower<br/>IFSC<br/>Dublin 1, Ireland</p>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Coffee Cafe Store",
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });
}
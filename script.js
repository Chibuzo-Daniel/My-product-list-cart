// i created an array of objects where each object represent a product and it's details  
const products = [
    {
       id: 1, 
       name: "Waffle with Berries", 
       category: "Waffle", 
       price: 6.50, 
       image: "/images/image-waffle-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg",
          thumbnail: "/images/image-waffle-thumbnail.jpg" 
     }, 
    {
       id: 2, 
       name: "Vanilla Bean Creme Brulee", 
       category: "creme Brulee",
       price: 7.0, 
       image: "/images/image-creme-brulee-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg", 
         thumbnail: "/images/image-creme-brulee-thumbnail.jpg"
     }, 
    {
       id: 3, 
       name: "Macaron Mix of Five", 
       category: "Macaron", 
       price: 8.0, 
       image: "/images/image-macaron-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg" ,
          thumbnail: "/images/image-macaron-thumbnail.jpg" 
     }, 
    {
       id: 4, 
       name: "Classic Tiramisu", 
       category: "Tiramisu", 
       price: 5.50, 
       image: "/images/image-tiramisu-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg" ,
          thumbnail: "/images/image-tiramisu-thumbnail.jpg"
     }, 
    {
       id: 5, 
       name: " Pistachio Baklava ", 
       category: "Baklava", 
       price: 4.0, 
       image: "/images/image-baklava-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg",
          thumbnail: "/images/image-baklava-thumbnail.jpg"
     }, 
     
    {
       id: 6, 
       name: "Lemon Meringue Pie", 
       category: "Meringue", 
       price: 5.0, 
       image: "/images/image-meringue-desktop.jpg" ,
         icon: "/images/icon-add-to-cart.svg",
          thumbnail: "/images/image-meringue-thumbnail.jpg"
     }, 
     

    {
       id: 7, 
       name: "Red Velvet Cake", 
       category: "Cake", 
       price: 4.50, 
       image: "/images/image-cake-desktop.jpg" ,
       icon: "/images/icon-add-to-cart.svg" ,
        thumbnail: "/images/image-cake-thumbnail.jpg"
     }, 
     

    {
       id: 8, 
       name: "Salted Caramel Brownie", 
       category: "Brownie", 
       price: 5.50, 
       image: "/images/image-brownie-desktop.jpg",
         icon: "/images/icon-add-to-cart.svg",
          thumbnail: "/images/image-brownie-thumbnail.jpg"
     }, 
     

    {
       id: 9, 
       name: "Vanilla Panna Cotta", 
       category: "Panna Cotta", 
       price: 6.50, 
       image: "/images/image-panna-cotta-desktop.jpg",
       icon: "/images/icon-add-to-cart.svg",
        thumbnail: "/images/image-panna-cotta-thumbnail.jpg"
     }        
]


//to add the products to the cart
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-item");
const cartCount = document.querySelector("#cart-count");
const btnaddCart = document.querySelectorAll(".btn-add-to-cart");
const confirm = document.querySelector(".confirm");
const orderTotal = document.querySelector(".order-total");
const space = " ";
space.innerText="";
const cartMemory = [];
const removeBtn = document.querySelector(".remove-btn");
const overlay = document.querySelector(".overlay-container")




//display the products on the screen using innerHTML
const dessert = document.querySelector(".product-grid")
function displayProducts() {
  let items = "";
  for ( let product of products) {

    //check if the product exist in the cart first
    const itemInCart = cartMemory.find(p=> p.id===product.id);
    const borderColor = itemInCart ? "orangeBorder" :"";
    //creat the button HTML
    buttomHTML ="";
    if(itemInCart){
      // if the product is in the cart the button should be orange

      buttomHTML= `
      <div class="qty-selector">
            <p class="minus" data-id="${product.id}"><img src="/images/icon-decrement-quantity.svg" alt=" The decrement button"></p>
            <span>${itemInCart.quantity}</span>
            <p class="plus" data-id="${product.id}"><img src="/images/icon-increment-quantity.svg" alt="The increment button"></p>
        </div>
      `;

      //color.style.border="2px solid #c73b0f"
      //color.classList.add("border");

      
    } else{
      buttomHTML=`
        <button class = "btn-add-to-cart" data-id = "${product.id}"><img src = ${product.icon} alt = "cart-icon" > Add to Cart</button>
        `;
    }
    const itemTemplate = `
    
    <div>
<div class= "image-container">
    <img src= ${product.image} alt ${product.name} class="product-image ${borderColor}">
     ${buttomHTML}
</div>
 <span class = "category">${product.category}</span>
        <h2 class = "product-name">${product.name}</h2>
        <p class = "price">$${product.price.toFixed(2)}</p> 
  </div> 
 `
 items = items + itemTemplate;
}

dessert.innerHTML = items 
}
displayProducts()


// console.log(orderTotal)
//create an empty cart memory to contain clicked products for display


// loop through all button adding event listener to them and getting thier details inother to identify which one was clicked exactly 
 // Listen to clicks anywhere inside the product grid
dessert.addEventListener("click", function(event) {
    // Find exactly what was clicked
    const target = event.target.closest('button, .plus, .minus');
    if (!target) return; // If we didn't click a button or a +/- icon, stop

    // Get the ID from the button or the icon's parent
    const productID = parseInt(target.getAttribute("data-id") || target.parentElement.getAttribute("data-id"));
    
    
    // Find the product and the cart item
    const selectedProduct = products.find(p => p.id === productID);
    const itemInCart = cartMemory.find(p => p.id === productID);

    // LOGIC 1: Clicking "Add to Cart"
    if (target.classList.contains("btn-add-to-cart")) {
        selectedProduct.quantity = 1;
        cartMemory.push(selectedProduct);
    } 
    // LOGIC 2: Clicking the Plus (+) icon
    else if (target.classList.contains("plus") || target.closest(".plus")) {
        if (itemInCart) itemInCart.quantity++;
    } 
    // LOGIC 3: Clicking the Minus (-) icon
    else if (target.classList.contains("minus") || target.closest(".minus")) {
        if (itemInCart) {
            itemInCart.quantity--;
            // Remove it if it hits zero
            if (itemInCart.quantity < 1) {
                const index = cartMemory.indexOf(itemInCart);
                cartMemory.splice(index, 1);
            }

            if(!itemInCart){
              //  location.reload()
              // displayProducts()
             }
        }
    }

    // THE MAGIC STEP: Refresh both the list and the cart
    displayProducts(); 
    renderCart();
});

//update the cart UI

// const cart = document.querySelector(".cart");
// const cartItems = document.querySelector(".cart-items");
function renderCart() {
    // A. CLEAR the container first!
    cartItems.innerHTML = "";

    let totalItem = 0;
    let total = 0;

    // B. Run the loop
    for (let i = 0; i < cartMemory.length; i++) {
        const item = cartMemory[i];
        
        // Add to our total count
        totalItem = item.quantity + totalItem;
        //calculate the total cost of the things bought  
        total = total+(item.price * item.quantity)
        // orderTotal.innerText=orderTotal.innerText+total

        // C. Build the HTML for the cartItem
        const cartItemHTML = `
            <div id="container">
                <div id="left">
                    <div id="product-name">${item.name}</div>
                    <div class="price-details">
                        <span id="product-count">${item.quantity}x</span>
                        <span id="product-price">@ $${item.price.toFixed(2)}</span>
                        <span id="calculated-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <div id="right">
                    <img src="./images/icon-remove-item.svg" alt="remove product" class="remove-btn" data-id="${item.id}">
                </div>
            </div>
          
            
        `;
        
        // update the cartite innerHTML
        cartItems.innerHTML = cartItems.innerHTML + cartItemHTML;


        
        
    }

    if(cartMemory.length>0){
      
        confirm.innerHTML=`
          
            <div id="down">
               <div id="order" style= "background-color:white;">
                  <p>Order Total</p>
                  <span class ="order-total">$${total}</span>
               </div>
  
               <div id="carbon"><img src="/images/icon-carbon-neutral.svg" alt="carbon neutral delivery">This is a <strong>carbon-neutral</strong> delivery</div>
               <button id="btn-confirm"> Confirm Order</button>

            </div>
        `;

    } else{
      confirm.innerHTML="";

      cartItems.innerHTML = `
      <div class="empty-state">
         <img src="/images/illustration-empty-cart.svg" alt="empty cart">
         <p>Your added items will appear here</p>
      </div>
    `;
    }

    // E. Finally, update the total count in the header
    cartCount.innerText = totalItem;
}

cartItems.addEventListener("click", function(event){
  const removeBtn = event.target.closest(".remove-btn");
  if(removeBtn){
    
    //get the ID of the clicked product
    const productID = parseInt(removeBtn.getAttribute("data-id") );
    //search for the ID in cart memory 
    const itemIndex = cartMemory.findIndex(p=> p.id===productID)
      //delete the product with the ID found from the cartmemory
    if(itemIndex>-1){
      cartMemory.splice(itemIndex, 1);
    }
    renderCart();
    displayProducts();
    
  }
});

// i used event delegation to display the confrmation receipt
confirm.addEventListener("click", function(event){
 const confirmBtn = event.target.closest("#btn-confirm")


 if(confirmBtn){

  const overlayProducts = document.querySelector(".overlay-products");
   const overlayTotal = document.querySelector(".overlay-order-total")
   console.log(overlayTotal)
  let overlayHTML ="";
  let finalTotal = 0;
  //go through the cartmemory to buld identify the selected products and the cost 
  cartMemory.forEach(item =>{
    finalTotal = finalTotal+(item.price*item.quantity)
    overlayHTML = overlayHTML + `
    
      <div class="overlay-product">

                    <div class="overlay-left">
                       <img src="${item.thumbnail}" alt="" class="overlay-img">
                       <div>
                        <span id="product-name">${item.name}</span> <br>
                        <span id="product-count">${item.quantity}x</span>
                        <span id="product-price">@${item.price}</span>
                       </div>
                    </div>

                    <div id="overlay-right">
                    <span id="calculated-price">$${(item.price*item.quantity)}</span>
                    </div>
                    
                  </div>

    `
  })
  overlayProducts.innerHTML= overlayHTML
  overlayTotal.innerHTML= `$${finalTotal}`
  console.log(overlayProducts)
  overlay.classList.remove("hide")
 }
})
// i used event delegation to reload the page when user clicks the start new order button
overlay.addEventListener("click", function(event){
  const newOrder = event.target.closest("#btn-new-order")
  if(newOrder){
    location.reload()
  }

})




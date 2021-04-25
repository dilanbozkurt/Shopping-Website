let carts = document.querySelectorAll(".add-cart")

class Product {
  constructor(image,name,tag,price,inCart) {
      this.image=image;
      this.name = name;
      this.tag = tag;
      this.price = price;
      this.inCart=inCart;
  }
}

let evermore = new Product("evermore.jpg","Evermore","evermore",20,0);
let folklore = new Product("folklore.jpg","Folklore","folklore",10,0);
let lover = new Product("lover.jpg","Lover","lover",10,0);
let reputation = new Product("reputation.jpg","Reputation","reputation",10,0);
let nineteen = new Product("nineteen.jpg","1989","nineteen",30,0);
let red = new Product("red.jpg","Red","red",10,0);

let products = [evermore,folklore,lover,reputation,nineteen,red];

///************************************************************************ */
let albums = [];
const addAlbum = (event)=>{
    event.preventDefault();

    var newAlbum = new Product();
    newAlbum.image = document.getElementById("myForm").elements[0].value;
    var str = String(newAlbum.image);
    var res = str.slice(0, 12);
    var finalstr = str.replace(res,"");
    newAlbum.name =  document.getElementById("myForm").elements[1].value;
    newAlbum.price = document.getElementById("myForm").elements[2].value;
    newAlbum.tag =   document.getElementById("myForm").elements[3].value;
    newAlbum.inCart =0;

    albums.push(newAlbum);
    document.forms[0].reset(); 

    localStorage.setItem('MyAlbumList', JSON.stringify(albums) );

    //display
    let newAlbums = localStorage.getItem("MyAlbumList");
    newAlbums = JSON.parse(newAlbums);
    albumsContainer = document.getElementById("newAlbums");
    
    albumsContainer.innerHTML += `
    <div class "newAlbums albumProduct">
      <img class="newimage" src="./images/${finalstr}">
      <h3 class="new" >${newAlbum.name}</h3>
      <h3 class="new" >$${newAlbum.price}</h3>
      <p class="new" ><q><i>${newAlbum.tag}</i></q></p>
      <a class="add-cart cartNew" href="#" onclick="onLoadCartNumbers()">Add Cart</a>
    </div>`;

    alert(document.getElementById("addedmessage").innerHTML);
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('addbtn').addEventListener('click', addAlbum);
});

/************************************************************************ */

for(let i=0; i<carts.length; i++){
  carts[i].addEventListener('click',()=> {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem("cartNumbers");
  if(productNumbers){
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product){

  let productNumbers =localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector(".cart span").textContent = productNumbers+1;
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector(".cart span").textContent = productNumbers=1;
  }
  setItem(product);
}

function setItem(product){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems= JSON.parse(cartItems);
  
  if(cartItems!=null){

    if(cartItems[product.tag] == undefined){
        cartItems ={
          ...cartItems,
          [product.tag]:product
        }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems = {
      [product.tag]:product
    }
  }
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
  displayCart();
}


function totalCost(product){
  var cartCost = localStorage.getItem("totalCost");
 
  if(cartCost != null){
    cartCost = parseInt(cartCost);
    cartCost = cartCost+product.price;
    localStorage.setItem("totalCost",cartCost);
  }else{
    localStorage.setItem("totalCost",product.price);
  }  

  document.getElementById("total").innerHTML = cartCost;
}


function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}


function showHome(shown, hidden) {
  document.getElementById(shown).style.display='flex';
  document.getElementById(hidden).style.display='none';
  document.getElementById("newAlbums").style.display="flex";
  return false;
}

function HideNewAlbums(){
  document.getElementById("newAlbums").style.display="none";
}

function showBuyingPage(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}


function displayBuyingPage() {
  var x = document.getElementById("buyingPage");
  if (x.style.display == "none") {
      x.style.display = "block"; 
  } else {
      x.style.display = "none";  
  }
}

function displayNewItemPage() {
  var x = document.getElementById("newItem");
  if (x.style.display == "none") {
      x.style.display = "block"; 
  } else {
      x.style.display = "none";  
  }
}

function message(){
  alert(document.getElementById("message").innerHTML);
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);

  if(cartItems && productContainer){
    productContainer.innerHTML= " ";
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
      <img class="cartItemImg" src="./images/${item.tag}.jpg">
      <span class="cartItemName">${item.name}</span>
      <div class="price" >$${item.price}</div>
      <div class="quantity"> 
        <span>${item.inCart}</span>  
      </div>
      <div class="total">
          $${item.inCart*item.price}
      </div>
      </div>
      `;
    });
    
  } 
}

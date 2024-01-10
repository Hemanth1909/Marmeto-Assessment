let listContainerElement = document.getElementById("listContainer");
let menBtnEl = document.getElementById('menBtn');
let womenBtnEl = document.getElementById('womenBtn');
let kidsBtnEl = document.getElementById('kidsbtn');
let productsData = [];

//fetching the data from the api
const fetchProducts = async() => {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }
        const responseData = await response.json();

        if (Array.isArray(responseData.categories)) {
            productsData = responseData.categories; // Store the fetched data
            // console.log(productsData)
            // Display products
            // renderProducts(); 
        } else {
            console.error('API response data is not an array:', responseData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


let currentClicked = "";
function onClickMen() {
    onClickbtn = true;
    currentClicked = "Men"
    renderProducts()
    menBtnEl.classList.add('current-btn');
    womenBtnEl.classList.remove('current-btn');
    kidsBtnEl.classList.remove('current-btn');
}

function onClickWomen()
{
    onClickbtn = true;
    currentClicked = "Women"
    renderProducts();
    menBtnEl.classList.remove('current-btn');
    womenBtnEl.classList.add('current-btn');
    kidsBtnEl.classList.remove('current-btn');
}

function onClickKids()
{
    onClickbtn = true;
    currentClicked = "Kids"
    renderProducts();
    menBtnEl.classList.remove('current-btn');
    womenBtnEl.classList.remove('current-btn');
    kidsBtnEl.classList.add('current-btn');
}

//Fetching the respective products according to the user actions
const renderProducts = () => {
    listContainerElement.innerHTML = ''; // Clear existing products
    productsData.forEach((product) => {
        console.log(product)
        if(product.category_name == currentClicked)
        {
            console.log(product)
            
            createProductCard(product);
        }
        
        // console.log(product)
        // listContainerElement.appendChild(productCard);
    });
};


const createProductCard = (product) => {
    product.category_products.forEach((variant) => {
        //creating html elements required for the product card
        const listElement = document.createElement('li')
        const productCard = document.createElement('div');
        const productImage = document.createElement('img');
        const imageContainer = document.createElement('div');
        const titleContainer = document.createElement('div');
        const titleEl = document.createElement('h2');
        const vendorEl = document.createElement('p');
        const priceContainer = document.createElement('div');
        const dealPriceEl = document.createElement('p')
        const originalPriceEl = document.createElement('p');
        const discountEl = document.createElement('p');
        const badgedText = document.createElement('p');

        //Calculating the discount percentage from the selling price and original price
        const discount =  (variant.compare_at_price - variant.price) ;
        const perDiscount = (discount / variant.compare_at_price) * 100;
        
        //setting the image url and appending it to parent container
        productImage.src = variant.image;
        productImage.alt = variant.title;
        productImage.className="card-image";
        productCard.appendChild(productImage);

        //If badge text is not null we will display on the image
        if(variant.badge_text != null)
        {
            imageContainer.textContent = variant.badge_text;
            imageContainer.className="image-container";
            productCard.appendChild(imageContainer)
        }

        //setting the text content for the title and appending it as a child for parent
        titleEl.textContent = variant.title;
        titleEl.className = 'card-title';
        titleContainer.appendChild(titleEl);
        titleContainer.className = 'card-title-container';
        productCard.appendChild(titleContainer);

        //setting the text content for the varient and appending it as a child for parent
        vendorEl.textContent = variant.vendor
        vendorEl.className = 'card-vendor';
        titleContainer.appendChild(vendorEl);

        //setting the text content for the deal price and appending it as a child for parent
        dealPriceEl.textContent = "Rs " + variant.price + ".00";
        dealPriceEl.className = 'deal-price';
        priceContainer.appendChild(dealPriceEl);

        //setting the text content for the origial price and appending it as a child for parent
        originalPriceEl.textContent = variant.compare_at_price + ".00";
        originalPriceEl.className = 'original-price';
        priceContainer.appendChild(originalPriceEl);
        
        //setting the text content for the discount percentage and appending it as a child for parent
        discountEl.textContent = `${Math.round(perDiscount)}% Off`;
        discountEl.className = 'discount';
        priceContainer.appendChild(discountEl);
        

        priceContainer.className = 'price-container';
        productCard.appendChild(priceContainer);

        //Creating the button element and appending it as a child to the parent
        let btnEl = document.createElement('button');
        btnEl.textContent = "Add to Cart"
        btnEl.className = "cart-btn";
        productCard.appendChild(btnEl);
  
        //finally, appending the product card to the list container
        productCard.className = 'card';
        listElement.appendChild(productCard);
        listElement.className = 'list-element'
        listContainerElement.appendChild(listElement);

        console.log(variant);
    });
    
};


fetchProducts()

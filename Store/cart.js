document.addEventListener('DOMContentLoaded', function () {
  const cartBtn = document.querySelector('.cart-btn');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartCount = document.querySelector('.cart-count');
  let cart = [];

  // Toggle cart dropdown
  cartBtn.addEventListener('click', function () {
      cartDropdown.classList.toggle('show');
  });

  // Hide cart dropdown when clicking outside
  document.addEventListener('click', function (event) {
      if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
          cartDropdown.classList.remove('show');
      }
  });

  // Add to cart functionality using event delegation
  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('add-to-cart')) {
          const productCard = event.target.closest('.product-card');
          const productId = productCard.getAttribute('data-product-id');
          const productName = productCard.querySelector('h2').textContent;
          const productPrice = productCard.querySelector('.price').textContent.trim();
          const productImage = productCard.querySelector('img').src;

          addToCart(productId, productName, productPrice, productImage);
      }
  });

  function addToCart(productId, productName, productPrice, productImage) {
      const existingProduct = cart.find(item => item.id === productId);

      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          const product = {
              id: productId,
              name: productName,
              price: productPrice,
              image: productImage,
              quantity: 1
          };
          cart.push(product);
      }

      updateCart();
      showSuccessAlert();
  }

  function showSuccessAlert() {
      Swal.fire({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
          icon: "success",
          title: "Item added"
      });
  }

  function updateCart() {
      // Update cart count
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

      // Update cart items display
      cartItemsContainer.innerHTML = '';
      
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.setAttribute('data-product-id', item.id);
          cartItem.innerHTML = `
              <div class="cart-item-details">
                  <button class="remove-item-btn" aria-label="Remove item">&times;</button>
                  <h3>${item.name}</h3>
                  <p class="price">${item.price}</p>
              </div>
              <div class="cart-item-quantity">
                  <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="9">
              </div>
          `;
          cartItemsContainer.appendChild(cartItem);

          // Add event listener for quantity input
          const quantityInput = cartItem.querySelector('.quantity-input');
          quantityInput.addEventListener('change', function() {
              const newQuantity = parseInt(this.value, 10);
              if (newQuantity > 0 && newQuantity <= 9) {
                  item.quantity = newQuantity;
                  updateCart();
              }
          });
      });

      // Attach remove item listeners
      attachRemoveListeners();
  }

  function attachRemoveListeners() {
      document.querySelectorAll('.remove-item-btn').forEach(button => {
          button.addEventListener('click', function() {
              const productId = this.closest('.cart-item').getAttribute('data-product-id');
              removeCartItem(productId);
          });
      });
  }

  function removeCartItem(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCart();
      if (document.querySelector('.swal2-container')) {
          updateCheckoutModal();
      }
  }

  function updateCheckoutModal() {
      const modalCartItems = document.querySelector('.swal2-html-container .cart-items');
      if (modalCartItems) {
          modalCartItems.innerHTML = cart.map(item => `
              <div class="cart-item" data-product-id="${item.id}">
                  <button class="remove-item-btn" aria-label="Remove item">&times;</button>
                  <div class="cart-item-details">
                      <h3>${item.name}</h3>
                      <p class="price">${item.price}</p>
                  </div>
                  <div class="cart-item-quantity">
                      <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="9">
                  </div>
              </div>
          `).join('');

          attachRemoveListeners();
      }
  }

  // Expose checkout function globally
  window.checkout = function() {
      Swal.fire({
          showConfirmButton: false,
          html: `
              <h2>Your Cart</h2>
              <div class="cart-items">
                  ${cart.map(item => `
                      <div class="cart-item" data-product-id="${item.id}">
                          <button class="remove-item-btn" aria-label="Remove item">&times;</button>
                          <div class="cart-item-details">
                              <h3>${item.name}</h3>
                              <p class="price">${item.price}</p>
                          </div>
                          <div class="cart-item-quantity">
                              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="9">
                          </div>
                      </div>
                  `).join('')}
              </div>
              <h2>Product Details</h2>
              <form id="product-form">
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" required>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" required>
                  <label for="phone">Phone Number:</label>
                  <input type="tel" id="phone" name="phone" required>
                  <label for="country">State:</label>
                  <select id="country" name="country" required>
                      <option value="">Select State</option>
                      <option value="Tunis">Tunis</option>
                      <option value="Ariana">Ariana</option>
                      <option value="Ben Arous">Ben Arous</option>
                      <option value="Manouba">Manouba</option>
                      <option value="Bizerte">Bizerte</option>
                      <option value="Nabeul">Nabeul</option>
                      <option value="Zaghouan">Zaghouan</option>
                      <option value="Beja">Beja</option>
                      <option value="Jendouba">Jendouba</option>
                      <option value="Kef">Kef</option>
                      <option value="Siliana">Siliana</option>
                      <option value="Kasserine">Kasserine</option>
                      <option value="Sidi Bouzid">Sidi Bouzid</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Monastir">Monastir</option>
                      <option value="Mahdia">Mahdia</option>
                      <option value="Sfax">Sfax</option>
                      <option value="Gabes">Gabes</option>
                      <option value="Mednine">Mednine</option>
                      <option value="Tozeur">Tozeur</option>
                      <option value="Kebili">Kebili</option>
                      <option value="Gafsa">Gafsa</option>
                      <option value="Tataouine">Tataouine</option>
                      <option value="Kairouan">Kairouan</option>
                  </select>
                  <label for="personaladdress">Delivery Address:</label>
                  <input type="text" id="personaladdress" name="personaladdress" required>
                  <q class="text-sm">5d around Sfax, 9d all over the Country</q><br>
                  <button type="submit" id="submit-btn">Submit</button>
              </form>
          `,
          focusConfirm: false,
          width: '600px'
      });

      // Handle form submission in checkout modal
      const form = document.querySelector('#product-form');
      if (form) {
          form.addEventListener('submit', function(event) {
              event.preventDefault();
              
              const formData = {
                  name: form.querySelector('#name').value,
                  email: form.querySelector('#email').value,
                  phone: form.querySelector('#phone').value,
                  country: form.querySelector('#country').value,
                  personaladdress: form.querySelector('#personaladdress').value,
                  products: cart
              };

              sendProductToGoogleSheets(
                  formData.name,
                  formData.email,
                  formData.phone,
                  formData.country,
                  formData.personaladdress,
                  formData.products
              );
          });
      }
  };
});
function sendProductToGoogleSheets(name, email, phone, country, personaladdress, products) {
    console.log('Submitting:', { name, email, phone, country, products });

    Swal.fire({
        title: "Sending...",
        text: "Please wait while your purchase is being processed.",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        background: "#00ACA8",
        willOpen: () => {
            Swal.showLoading();
        },
    });
    // Google Sheets API code here
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxfuDX3Ltlz24opTbUeU2JZfh4A2CV-wqvK3lQ7wL5JTYCrWL-G8ptKooAiHVGVNZnDow/exec';
    const xhr = new XMLHttpRequest();

    xhr.open("POST", scriptUrl, true);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            Swal.close(); // Close the loading dialog
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Google Sheets Response:', response);
                Swal.fire({
                    title: "Success!",
                    text: "Your purchase has been successfully processed.",
                    icon: "success",
                    confirmButtonText: "OK",
                    background: "#00ACA8",
                    backdrop: "rgba(0,0,0,0.4)",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error processing your request. we'll send you an email",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    // Prepare the data as FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('personaladdress', personaladdress);
    formData.append('products', JSON.stringify(products));

    xhr.send(formData);
}

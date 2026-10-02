const STORAGE_KEY = 'miniPOSCart';

let cart = loadFromLocalStorage();
let promoApplied = false;

document.addEventListener('DOMContentLoaded', () => {
  const itemForm = document.getElementById('itemForm');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const cashInput = document.getElementById('cashInput');
  const resetTransactionBtn = document.getElementById('resetTransactionBtn');

  itemForm.addEventListener('submit', addItem);
  applyPromoBtn.addEventListener('click', applyPromoCode);
  cashInput.addEventListener('input', calculateChange);
  resetTransactionBtn.addEventListener('click', resetTransaction);

  renderCart();
  calculateChange();
});

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function showError(inputId, message) {
  const errorElement = document.getElementById(`${inputId}Error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(inputId) {
  const errorElement = document.getElementById(`${inputId}Error`);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function clearFormErrors() {
  ['itemName', 'itemPrice', 'itemQty'].forEach(clearError);
}

function validateForm() {
  clearFormErrors();

  const nameInput = document.getElementById('itemName');
  const priceInput = document.getElementById('itemPrice');
  const qtyInput = document.getElementById('itemQty');

  const itemName = nameInput.value.trim();
  const itemPrice = priceInput.value.trim();
  const itemQty = qtyInput.value.trim();

  let isValid = true;

  if (!itemName) {
    showError('itemName', 'Nama barang wajib diisi.');
    isValid = false;
  } else if (itemName.length < 3) {
    showError('itemName', 'Nama barang minimal 3 karakter.');
    isValid = false;
  }

  if (!itemPrice) {
    showError('itemPrice', 'Harga satuan wajib diisi.');
    isValid = false;
  } else {
    const priceNumber = Number(itemPrice);
    if (Number.isNaN(priceNumber) || priceNumber <= 0 || priceNumber < 500) {
      showError('itemPrice', 'Harga satuan harus berupa angka minimal Rp500.');
      isValid = false;
    }
  }

  if (!itemQty) {
    showError('itemQty', 'Qty wajib diisi.');
    isValid = false;
  } else {
    const qtyNumber = Number(itemQty);
    if (!Number.isInteger(qtyNumber) || qtyNumber < 1) {
      showError('itemQty', 'Qty harus bilangan bulat minimal 1.');
      isValid = false;
    }
  }

  return isValid;
}

function resetItemForm() {
  document.getElementById('itemForm').reset();
  clearFormErrors();
}

function calculateSubtotal(item) {
  return item.price * item.qty;
}

function calculateTotal() {
  return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
}

function calculateDiscount(totalBelanja) {
  const promoCodeInput = document.getElementById('promoCode');
  const code = promoCodeInput.value.trim().toUpperCase();

  let discount = 0;

  if (totalBelanja >= 50000) {
    discount = totalBelanja * 0.1;
  }

  if (code === 'HEMAT10') {
    discount = Math.max(discount, totalBelanja * 0.1);
    promoApplied = true;
  } else {
    promoApplied = false;
  }

  return discount;
}

function calculateFinalTotal() {
  const totalBelanja = calculateTotal();
  const discount = calculateDiscount(totalBelanja);
  return Math.max(totalBelanja - discount, 0);
}

function calculateChange() {
  const paymentStatus = document.getElementById('paymentStatus');
  const changeValue = document.getElementById('changeValue');

  if (!cart.length) {
    paymentStatus.textContent = 'Keranjang masih kosong, tidak dapat melakukan pembayaran.';
    paymentStatus.className = 'payment-status warning';
    changeValue.textContent = formatRupiah(0);
    return;
  }

  const cashInput = document.getElementById('cashInput');
  const totalAkhir = calculateFinalTotal();
  const cash = Number(cashInput.value) || 0;

  if (!cashInput.value) {
    paymentStatus.textContent = '';
    paymentStatus.className = 'payment-status';
    changeValue.textContent = formatRupiah(0);
    return;
  }

  if (cash >= totalAkhir) {
    const change = cash - totalAkhir;
    paymentStatus.textContent = 'Pembayaran diterima.';
    paymentStatus.className = 'payment-status success';
    changeValue.textContent = formatRupiah(change);
  } else {
    paymentStatus.textContent = 'Uang belum mencukupi.';
    paymentStatus.className = 'payment-status error';
    changeValue.textContent = formatRupiah(0);
  }
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadFromLocalStorage() {
  const savedCart = localStorage.getItem(STORAGE_KEY);
  if (!savedCart) {
    return [];
  }

  try {
    const parsedData = JSON.parse(savedCart);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Gagal membaca data keranjang dari localStorage:', error);
    return [];
  }
}

function renderCart() {
  const cartTableBody = document.getElementById('cartTableBody');
  const totalBelanjaElement = document.getElementById('totalBelanja');
  const discountValueElement = document.getElementById('discountValue');
  const finalTotalElement = document.getElementById('finalTotal');

  if (!cart.length) {
    cartTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">Keranjang masih kosong.</td></tr>';
    totalBelanjaElement.textContent = formatRupiah(0);
    discountValueElement.textContent = formatRupiah(0);
    finalTotalElement.textContent = formatRupiah(0);
    return;
  }

  cartTableBody.innerHTML = cart
    .map((item, index) => {
      const subtotal = calculateSubtotal(item);
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${formatRupiah(item.price)}</td>
          <td>${item.qty}</td>
          <td>${formatRupiah(subtotal)}</td>
          <td>
            <button type="button" class="delete-btn" data-id="${item.id}">Hapus</button>
          </td>
        </tr>
      `;
    })
    .join('');

  const totalBelanja = calculateTotal();
  const discount = calculateDiscount(totalBelanja);
  const finalTotal = Math.max(totalBelanja - discount, 0);

  totalBelanjaElement.textContent = formatRupiah(totalBelanja);
  discountValueElement.textContent = formatRupiah(discount);
  finalTotalElement.textContent = formatRupiah(finalTotal);

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemId = Number(event.target.dataset.id);
      removeItem(itemId);
    });
  });

  calculateChange();
}

function addItem(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const name = document.getElementById('itemName').value.trim();
  const price = Number(document.getElementById('itemPrice').value);
  const qty = Number(document.getElementById('itemQty').value);

  cart.push({
    id: Date.now(),
    name,
    price,
    qty,
  });

  saveToLocalStorage();
  renderCart();
  resetItemForm();
}

function removeItem(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveToLocalStorage();
  renderCart();
  calculateChange();
}

function applyPromoCode() {
  const promoCodeInput = document.getElementById('promoCode');
  const promoMessage = document.getElementById('promoMessage');
  const code = promoCodeInput.value.trim().toUpperCase();

  if (!code) {
    promoMessage.textContent = 'Kode promo belum diisi.';
    promoMessage.className = 'promo-message error';
    return;
  }

  if (code === 'HEMAT10') {
    promoMessage.textContent = 'Kode promo berhasil digunakan.';
    promoMessage.className = 'promo-message success';
    promoApplied = true;
  } else {
    promoMessage.textContent = 'Kode promo tidak valid.';
    promoMessage.className = 'promo-message error';
    promoApplied = false;
  }

  renderCart();
}

function resetTransaction() {
  const confirmReset = window.confirm('Apakah Anda yakin ingin mereset transaksi?');

  if (!confirmReset) {
    return;
  }

  cart = [];
  promoApplied = false;
  localStorage.removeItem(STORAGE_KEY);

  document.getElementById('itemForm').reset();
  document.getElementById('promoCode').value = '';
  document.getElementById('cashInput').value = '';
  document.getElementById('promoMessage').textContent = '';
  document.getElementById('promoMessage').className = 'promo-message';
  document.getElementById('paymentStatus').textContent = '';
  document.getElementById('paymentStatus').className = 'payment-status';
  document.getElementById('changeValue').textContent = formatRupiah(0);

  clearFormErrors();
  renderCart();
  calculateChange();
}

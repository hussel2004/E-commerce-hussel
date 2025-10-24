const qtyButtons = document.querySelectorAll('.qty-btn');
const totalCells = document.querySelectorAll('.total');
const summaryTotal = document.querySelector('.total-line span:last-child');

qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        const span = parent.querySelector('span');
        let quantity = parseInt(span.textContent);

        if (btn.textContent === '+' && quantity < 10) quantity++;
        if (btn.textContent === '−' && quantity > 1) quantity--;

        span.textContent = quantity;

        const item = parent.parentElement;
        const priceText = item.querySelector('.price').textContent.replace('€', '');
        const newTotal = (parseFloat(priceText) * quantity).toFixed(2);
        item.querySelector('.total').textContent = newTotal + '€';

        let total = 0;
        totalCells.forEach(cell => {
            total += parseFloat(cell.textContent.replace('€', ''));
        });
        summaryTotal.textContent = total.toFixed(2) + '€';
    });
});
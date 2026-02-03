const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

// 1. Data Fetching
async function getMarketData() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        window.marketData = data; // Cache for searching
        renderTable(data);
    } catch (e) {
        console.error("API Error:", e);
    }
}

function renderTable(coins) {
    const body = document.getElementById('crypto-body');
    body.innerHTML = coins.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td>$${c.current_price.toLocaleString()}</td>
            <td style="color: ${c.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'}">
                ${c.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td>$${(c.market_cap / 1e9).toFixed(2)}B</td>
        </tr>
    `).join('');
}

// 2. Real-time Search
document.getElementById('cryptoSearch').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = window.marketData.filter(c => c.name.toLowerCase().includes(val));
    renderTable(filtered);
});

// 3. Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// 4. Scroll Effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Navbar Interaction
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

window.onload = getMarketData;
// seedProducts.js

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/products'; // Adjust if your backend runs on a different port

// Sample products to seed
const sampleProducts = [
  {
    type: 'Garlic',
    quantity: 1000,
    price: 30,
    harvest_date: '2025-07-01',
    image_url: 'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/garlic.jpg.webp' 
  },
  {
    type: 'Cabbages',
    quantity: 500,
    price: 80,
    harvest_date: '2025-06-15',
    image_url: 'https://www.google.com/imgres?q=cabbages&imgurl=https%3A%2F%2Fwww.greenlife.co.ke%2Fwp-content%2Fuploads%2F2022%2F04%2FCabbage.jpg&imgrefurl=https%3A%2F%2Fwww.greenlife.co.ke%2Fcabbage-planting-guide%2F&docid=2uaMnwk3xO6aoM&tbnid=XlVAfhogmK6dpM&vet=12ahUKEwj-yIGsxuGOAxUIfKQEHTQQMtQQM3oECCUQAA..i&w=2000&h=1329&hcb=2&ved=2ahUKEwj-yIGsxuGOAxUIfKQEHTQQMtQQM3oECCUQAA'
  },
  {
    type: 'Tomatoes',
    quantity: 300,
    price: 50,
    harvest_date: '2025-07-10',
    image_url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' // tomatoes
  },
  {
    type: 'potatoes',
    quantity: 800,
    price: 40,
    harvest_date: '2025-07-05',
    image_url: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80' // potatoes
  },
  {
    type: 'Cabbage',
    quantity: 200,
    price: 25,
    harvest_date: '2025-07-12',
    image_url: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' // cabbage
  }
];

async function seedProducts() {
  for (const product of sampleProducts) {
    try {
      const res = await axios.post(API_URL, product);
      console.log(`Seeded: ${product.type}`);
    } catch (err) {
      console.error(`Error seeding ${product.type}:`, err.response ? err.response.data : err.message);
    }
  }
  console.log('Seeding complete.');
}

seedProducts();

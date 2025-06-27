

import axios from 'axios';
import dealerData from '../data/sampleItems.js';

// Configuration
const API_URL = 'http://localhost:5000/api/dealers';

// Axios instance with auth header
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Upload a single dealer record
 * @param {Object} dealer - The dealer data object
 * @returns {Promise} - The axios response promise
 */
const uploadDealer = async (dealer) => {
  try {
    const response = await apiClient.post(API_URL, dealer);
    console.log(`✅ Successfully added: ${dealer.name} (${response.data.data._id})`);
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to add ${dealer.name}: ${error.response?.data?.message || error.message}`);
    return null;
  }
};

/**
 * Upload all dealers with delay between requests
 * @param {Array} dealers - Array of dealer objects
 * @param {Number} delayMs - Delay between requests in milliseconds
 */
const uploadAllDealers = async (dealers, delayMs = 500) => {
  console.log(`Starting upload of ${dealers.length} dealers...`);
  
  // Track statistics
  let successful = 0;
  let failed = 0;
  
  // Process dealers one by one with delay
  for (let i = 0; i < dealers.length; i++) {
    console.log(`Processing ${i+1}/${dealers.length}: ${dealers[i].name}`);
    
    const result = await uploadDealer(dealers[i]);
    if (result) successful++;
    else failed++;
    
    // Add delay between requests to avoid overwhelming the server
    if (i < dealers.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  // Print summary
  console.log('\n======= UPLOAD SUMMARY =======');
  console.log(`Total processed: ${dealers.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log('==============================\n');
};

/**
 * Check if dealer exists by GST number to avoid duplicates
 * @param {String} gstNumber - The GST number to check
 * @returns {Boolean} - True if dealer exists
 */
const checkDealerExists = async (gstNumber) => {
  try {
    const response = await apiClient.get(`${API_URL}/search?query=${gstNumber}`);
    return response.data.count > 0;
  } catch (error) {
    console.error(`Error checking dealer: ${error.message}`);
    return false;
  }
};

/**
 * Upload dealers that don't already exist
 */
const uploadNonExistingDealers = async () => {
  console.log('Checking for existing dealers to avoid duplicates...');
  
  const dealersToUpload = [];
  
  for (const dealer of dealerData) {
    const exists = await checkDealerExists(dealer.gstNumber);
    if (!exists) {
      dealersToUpload.push(dealer);
    } else {
      console.log(`Skipping ${dealer.name} (already exists)`);
    }
  }
  
  console.log(`Found ${dealersToUpload.length} new dealers to upload.`);
  
  if (dealersToUpload.length > 0) {
    await uploadAllDealers(dealersToUpload);
  }
};

// Run the script
const runSeed = async () => {
  try {
    // Check if we should skip duplicate check
    const skipDuplicateCheck = process.argv.includes('--force');
    
    if (skipDuplicateCheck) {
      console.log('Force mode: uploading all dealers without checking for duplicates');
      await uploadAllDealers(dealerData);
    } else {
      await uploadNonExistingDealers();
    }
    
    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  }
};

// Execute the seed function
runSeed();

// Usage instructions for CLI
console.log(`
===== DEALER SEED UTILITY =====
Run with normal mode: node seedDealers.js
Run with force mode (skips duplicate check): node seedDealers.js --force
===============================
`);
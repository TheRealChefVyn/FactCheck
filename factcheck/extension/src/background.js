// Background script for the extension

// API endpoint for fact checking
const API_ENDPOINT = 'http://localhost:8000/api/factcheck';

// Function to send text to backend for fact checking
async function checkFact(text) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking facts:', error);
    return { error: error.message };
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECK_FACT') {
    checkFact(message.data.text).then(result => {
      // Send result back to popup or content script
      chrome.runtime.sendMessage({
        type: 'FACT_CHECK_RESULTS',
        data: result
      });
      
      // If this came from a tab, send the result to that tab
      if (sender.tab) {
        chrome.tabs.sendMessage(sender.tab.id, {
          type: 'FACT_CHECK_RESULTS',
          data: result
        });
      }
    });
  }
  
  // Return true to indicate async response
  return true;
});

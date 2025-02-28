// API service for communicating with the backend

// Base URL for the API
const API_BASE_URL = 'http://localhost:8000/api';

// Function to get fact check results
export async function getFactCheckResults(text) {
  try {
    const response = await fetch(`${API_BASE_URL}/factcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching fact check results:', error);
    throw error;
  }
}

// Function to get fact check history
export async function getFactCheckHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching fact check history:', error);
    throw error;
  }
}

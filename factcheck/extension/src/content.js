// Content script that runs on social media sites

// Function to extract text from selected elements
function extractTextFromPosts() {
  // This will need to be customized for each social media platform
  // Example for Twitter
  if (window.location.hostname.includes('twitter.com')) {
    return Array.from(document.querySelectorAll('[data-testid="tweetText"]'))
      .map(element => element.textContent);
  }
  
  // Example for Facebook
  if (window.location.hostname.includes('facebook.com')) {
    return Array.from(document.querySelectorAll('.userContent'))
      .map(element => element.textContent);
  }
  
  // Example for Reddit
  if (window.location.hostname.includes('reddit.com')) {
    return Array.from(document.querySelectorAll('.RichTextJSON-root'))
      .map(element => element.textContent);
  }
  
  return [];
}

// Function to send text to background script for fact checking
function sendForFactChecking(text) {
  chrome.runtime.sendMessage({
    type: 'CHECK_FACT',
    data: { text }
  });
}

// Listen for user selection
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 20) { // Only process selections with meaningful length
    sendForFactChecking(selectedText);
  }
});

// Process posts on page load
window.addEventListener('load', () => {
  const posts = extractTextFromPosts();
  
  // Add fact-check buttons to posts
  posts.forEach((postText, index) => {
    // This implementation will vary based on the site's DOM structure
    // This is a simplified example
    const button = document.createElement('button');
    button.textContent = 'Fact Check';
    button.className = 'factcheck-button';
    button.addEventListener('click', () => {
      sendForFactChecking(postText);
    });
    
    // Append button to post (this will need customization)
    // This is just a placeholder implementation
  });
});

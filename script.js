async function updateAndGetCount() {
  const apiUrl = "https://0f83e3uuv1.execute-api.us-east-1.amazonaws.com/Prod/counter";
  const countElement = document.getElementById('visitorCount');

  if (!countElement) {
      console.error("Element with ID 'visitorCount' not found!");
      return;
  }

  try {
      const response = await fetch(apiUrl, { method: 'POST' });

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          countElement.textContent = "Visitor count unavailable";
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.count) {
        console.error("Error: 'count' is missing in response");
        countElement.textContent = "Failed to load visitor count";
        return;
      }
      
      countElement.textContent = String(data.count);

  } catch (error) {
      console.error("Error updating/fetching count:", error);
      countElement.textContent = "Failed to load visitor count";
  }
}

window.addEventListener('DOMContentLoaded', updateAndGetCount);
const url = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';

fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODcyMDIzLCJpYXQiOjE3MjM4NzE3MjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA5NzJhYzU1LWVhZGEtNDYwNS04YTk2LTg1N2YzNDUzOTkzYiIsInN1YiI6InNyZWVrYXJ2YWx3YTIwMDNAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIwOTcyYWM1NS1lYWRhLTQ2MDUtOGE5Ni04NTdmMzQ1Mzk5M2IiLCJjbGllbnRTZWNyZXQiOiJpUmlTTHFVYUdCc1N2cmlFIiwib3duZXJOYW1lIjoic3JlZWthcnZhbHdhIiwib3duZXJFbWFpbCI6InNyZWVrYXJ2YWx3YTIwMDNAZ21haWwuY29tIiwicm9sbE5vIjoiMjFKNDFBNjZDNyJ9.pHYGLj35iglbfCqSZZBo4DqZpdgrufWQ2oWfpKTt2bI'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Request successful:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
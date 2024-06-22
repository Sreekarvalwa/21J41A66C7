const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

//for choosing odd numbers

app.post('/numbers/e', (req, res) => {

  const numbers = req.body.numbers;


  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required and must not be empty' });
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  
  res.json({
    numbers: numbers,
    avg: average
  });
});

// for choosing even numbers

app.post('/numbers/even', (req, res) => {
 
  const numbers = req.body.numbers;

  
  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required and must not be empty' });
  }


  const evenNumbers = numbers.filter(num => num % 2 === 0);


  res.json({
    evenNumbers: evenNumbers
  });
});


//for choosing random numbers

function getRandomNumbersFromList(list, count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    randomNumbers.push(list[randomIndex]);
  }
  return randomNumbers;
}



app.post('/numbers/randoms', (req, res) => {
  
  const { numbers, count } = req.body;


  if (!Array.isArray(numbers) || numbers.length === 0 || typeof count !== 'number' || count <= 0) {
    return res.status(400).json({ error: 'Valid numbers array and positive count are required' });
  }

 
  const randomNumbers = getRandomNumbersFromList(numbers, count);


  res.json({
    randomNumbers: randomNumbers
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
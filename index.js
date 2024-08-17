const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Helper functions

// Calculate the average of an array of numbers
function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Filter even numbers from an array
function filterEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}

// Filter odd numbers from an array
function filterOddNumbers(numbers) {
  return numbers.filter(num => num % 2 !== 0);
}

// Get random numbers from a list
function getRandomNumbersFromList(list, count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    randomNumbers.push(list[randomIndex]);
  }
  return randomNumbers;
}

// Generate a Fibonacci sequence up to 'n' numbers
function generateFibonacci(n) {
  if (n <= 0) return [];
  const fib = [0, 1];
  while (fib.length < n) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib.slice(0, n);
}

// Check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

// Routes

// Route to calculate the average of an array of numbers
app.post('/numbers/average', (req, res) => {
  const numbers = req.body.numbers;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required and must not be empty' });
  }

  const average = calculateAverage(numbers);

  res.json({
    numbers: numbers,
    avg: average
  });
});

// Route to filter even numbers from an array
app.post('/numbers/even', (req, res) => {
  const numbers = req.body.numbers;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required and must not be empty' });
  }

  const evenNumbers = filterEvenNumbers(numbers);

  res.json({
    evenNumbers: evenNumbers
  });
});

// Route to filter odd numbers from an array
app.post('/numbers/odd', (req, res) => {
  const numbers = req.body.numbers;

  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required and must not be empty' });
  }

  const oddNumbers = filterOddNumbers(numbers);

  res.json({
    oddNumbers: oddNumbers
  });
});

// Route to get random numbers from a list
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

// Route to generate a Fibonacci sequence
app.post('/numbers/fibonacci', (req, res) => {
  const { count } = req.body;

  if (typeof count !== 'number' || count <= 0) {
    return res.status(400).json({ error: 'Count must be a positive number' });
  }

  const fibonacciNumbers = generateFibonacci(count);

  res.json({
    count: count,
    fibonacciNumbers: fibonacciNumbers
  });
});

// Route to check if numbers in an array are prime
app.post('/numbers/primes', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number' || !Number.isInteger(num))) {
    return res.status(400).json({ error: 'A valid array of integer numbers is required' });
  }

  if (numbers.some(num => num < 0)) {
    return res.status(400).json({ error: 'All numbers must be non-negative integers' });
  }

  const primeResults = numbers.map(num => ({
    number: num,
    isPrime: isPrime(num)
  }));

  res.json({
    primeResults: primeResults
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

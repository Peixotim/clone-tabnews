test('Espero que um seja um',() =>{
  const number = 1;
  expect(number).toBe(1);
})

test("Espero que a soma de dois números seja resultante em um numero par" , () =>{
  const numberOne = 1;
  const numberTwo = 1;
  const sum = numberOne+numberTwo;

  expect(sum % 2).toBe(0)
})
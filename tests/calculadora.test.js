const calculadora = require('../models/calculadora')

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

test('Somar dois mais dois deveria retornar 4',() =>{
  const result = calculadora.somar(2,2);
  //O lado do expect deve ser um softcoded
  //Já o lado do toBe deve ser um hardedCoded ou seja passar o valor no modo "hard"
  expect(result).toBe(4);
})

test('Passando uma string , que nao seja um número ocorre um erro', () =>{
  const result = calculadora.somar('Pizza',20);
  
  expect(result).toBe('Error')
})

test('Não passando nada , oque deve se retornar é uma mensagem de error ',() =>{
  const result = calculadora.somar();

  expect(result).toBe('Error , você não enviou nenhum número para efetuar a soma')
})
import  Transactions  from '../src/Helpers/Transactions'

it('gets transactions when double cancel', () => {
  const persons = [{
        id: 1,
        name: "A",
        balance: 50,
      },
      {
        id: 2,
        name: "B",
        balance: -50,
      },
      {
        id: 3,
        name: "C",
        balance: 50,
      },
      {
        id: 4,
        name: "D",
        balance: -50,
      }
  ];

  const transactions = [
    {
        from: "B",
        to: "A",
        amount: 50,
      },
      { 
        from: "D",
        to: "C",
        amount: 50
      }
  ];
  
  expect(Transactions.update(persons)).toEqual(transactions);
})

it('gets transactions when odd cancel', () => {
  const persons = [{
        id: 1,
        name: "A",
        balance: 60,
      },
      {
        id: 2,
        name: "B",
        balance: 10,
      },
      {
        id: 3,
        name: "C",
        balance: -30,
      },
      {
        id: 4,
        name: "D",
        balance: -40,
      }
  ];

  const transactions = [
    {
        from: "D",
        to: "A",
        amount: 40,
      },
      { 
        from: "C",
        to: "A",
        amount: 20
      },
      {
        from: "C",
        to: "B",
        amount: 10
      }
  ];
  
  expect(Transactions.update(persons)).toEqual(transactions);
})

it('finds highest balance', () => {
  const persons = [{
        id: 1,
        name: "A",
        balance: -60,
      },
      {
        id: 2,
        name: "B",
        balance: 10,
      },
      {
        id: 3,
        name: "C",
        balance: -30,
      },
      {
        id: 4,
        name: "D",
        balance: -40,
      }
  ];
  
  expect(persons.reduce(Transactions.findHighestBalance)).toEqual({
        id: 1,
        name: "A",
        balance: -60,
      });
})

it('finds updates balance', () => {
  const persons = [{
        id: 1,
        name: "A",
        balance: -60,
      },
      {
        id: 2,
        name: "B",
        balance: 10,
      }
  ];

  const result = [{
        id: 1,
        name: "A",
        balance: -50,
      },
      {
        id: 2,
        name: "B",
        balance: 10,
      }
  ];
  
  expect(Transactions.updateBalance(persons, {id: 1, name: "A", balance: -60,}, -50)).toEqual(result);
})

it('removes an object from the array', () => {
  const person1 = {
        id: 1,
        name: "A",
        balance: -60,
      };

  const person2 = {
        id: 2,
        name: "B",
        balance: 10,
  }

  const person3 = {
        id: 3,
        name: "B",
        balance: 10,
  }

  let persons = [person1,person2, person3];
  persons.splice(persons.indexOf(person2),1);
  expect(persons).toEqual([person1,person3])
})
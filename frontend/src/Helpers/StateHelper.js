import Transactions from './Transactions'

function applyBusinessLogic(state, persons, newExpenses) {
  //This functions should not take persons or newExpenses instead just new and old state (w new persons and expenses)
  if (typeof newExpenses === 'undefined')
    newExpenses = state.expenses

  if (typeof persons === 'undefined' || persons === null) return;
  persons.forEach((p) => {
    p.totalAmount = newExpenses
      .filter(e => e.personId === p.personId)
      .reduce((total, expense) => { return total + expense.amount }, 0)
  })
  const total = persons.reduce((total, person) => { return total + person.totalAmount }, 0)
  const totalCount = persons.reduce((count, person) => { return count + person.count }, 0);
  const perPerson = totalCount !== 0 ? total / totalCount : 0;

  const expensesWithPerPerson = newExpenses.map(e => {
    const headCount = e.personShare.reduce((acc, id) => {
      const person = persons.find(p => p.personId === id)
      if (typeof person !== "undefined") {
        return person.count + acc
      }
      return acc
    }, 0)
    e.perPerson = e.amount / headCount
    return e
  })

  const balancePersons = persons.map(p => {
    p.totalCost = expensesWithPerPerson.reduce((acc, expense) => {
      if (expense.personShare.includes(p.personId)) {
        return acc + (expense.perPerson * p.count)
      }
      return acc
    }, 0)
    p.balance = p.totalAmount - p.totalCost
    return Object.assign({}, p)
  })

  const transactions = Transactions.update(persons); //Todo using old persons cause Transactions mutates state =(. Fix this)
  return Object.assign({}, state, { name: state.name, lastState: state, persons: balancePersons, total: total, perPerson: perPerson, transactions: transactions, expenses: newExpenses });
};

const StateHelper = { applyBusinessLogic };
export default StateHelper;
import { save } from "./storage.js";

export let ledger = [];
export let debts = [];
export let loans = [];

export function setData(data) {
  ledger = data.ledger || [];
  debts = data.debts || [];
  loans = data.loans || [];
}

// MOVIMIENTOS
export function addEntry(type, amount, description) {
  ledger.push({
    id: Date.now(),
    date: new Date(),
    description,
    amount,
    type
  });

  save({ ledger, debts, loans });
}

// DEUDAS
export function addDebt(amount, description) {
  debts.push({
    id: Date.now(),
    description,
    total: amount,
    remaining: amount
  });

  save({ ledger, debts, loans });
}

export function payDebt(id, amount) {
  const debt = debts.find(d => d.id === id);
  if (!debt) return;

  debt.remaining -= amount;

  ledger.push({
    id: Date.now(),
    description: `Pago deuda`,
    amount,
    type: "expense"
  });

  if (debt.remaining <= 0) {
    debts = debts.filter(d => d.id !== id);
  }

  save({ ledger, debts, loans });
}

// PRÉSTAMOS
export function addLoan(amount, description, installments) {
  loans.push({
    id: Date.now(),
    description,
    total: amount,
    installments,
    paidInstallments: 0
  });

  save({ ledger, debts, loans });
}

export function payLoan(id) {
  const loan = loans.find(l => l.id === id);
  if (!loan) return;

  const cuota = loan.total / loan.installments;

  loan.paidInstallments++;

  ledger.push({
    id: Date.now(),
    description: `Cuota préstamo`,
    amount: cuota,
    type: "expense"
  });

  if (loan.paidInstallments === loan.installments) {
    loans = loans.filter(l => l.id !== id);
  }

  save({ ledger, debts, loans });
}

export function getAccountTotal() {
  let total = 0;

  ledger.forEach(l => {
    if (l.type === "income") total += l.amount;
    else total -= l.amount;
  });

  return total;
}
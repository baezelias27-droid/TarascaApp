import { ledger, debts, loans, getAccountTotal } from "./ledger.js";
import { formatMoney } from "./utils.js";

export function updateBalances() {
  const caja = getAccountTotal();
  const deuda = debts.reduce((a, d) => a + d.remaining, 0);

  document.getElementById("balance").textContent = "$" + formatMoney(caja);
  document.getElementById("debtTotal").textContent = formatMoney(deuda);
  document.getElementById("realBalance").textContent =
    formatMoney(caja - deuda);
}

export function render() {
  const list = document.getElementById("movementsList");
  if (!list) return;

  list.innerHTML = "";

  ledger.forEach(l => {
    const div = document.createElement("div");
    div.innerHTML = `${l.type === "income" ? "+" : "-"}$${formatMoney(l.amount)} - ${l.description}`;
    list.appendChild(div);
  });
}

export function renderDebts() {
  const c = document.getElementById("debtsList");
  if (!c) return;

  c.innerHTML = "";

  debts.forEach(d => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${d.description}
      <div>$${formatMoney(d.remaining)}</div>
      <button data-pay="${d.id}">Pagar</button>
      <button data-pay-full="${d.id}">Total</button>
    `;
    c.appendChild(div);
  });
}

export function renderLoans() {
  const c = document.getElementById("loansList");
  if (!c) return;

  c.innerHTML = "";

  loans.forEach(l => {
    const restantes = l.installments - l.paidInstallments;

    const div = document.createElement("div");
    div.innerHTML = `
      ${l.description}
      <div>${l.paidInstallments}/${l.installments}</div>
      <div>Restantes: ${restantes}</div>
      <button data-loan-pay="${l.id}">Pagar cuota</button>
    `;
    c.appendChild(div);
  });
}
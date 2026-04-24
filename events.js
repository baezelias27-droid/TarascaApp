import { addEntry, addDebt, addLoan, payDebt, payLoan, debts, getAccountTotal } from "./ledger.js";
import { render, updateBalances, renderDebts, renderLoans } from "./ui.js";

export function initEvents() {
  const amountInput = document.getElementById("amount");
const description = document.getElementById("description");
const operationType = document.getElementById("operationType");
const installments = document.getElementById("installments");

  const incomeBtn = document.getElementById("incomeBtn");
  const expenseBtn = document.getElementById("expenseBtn");

  incomeBtn.onclick = () => {
    const amount = Number(amountInput.value);
    const desc = description.value;
    const type = operationType.value;
    const inst = Number(installments.value);

    if (!amount) return;

    if (type === "debt") addDebt(amount, desc);
    else if (type === "loan") addLoan(amount, desc, inst);
    else addEntry("income", amount, desc);

    updateBalances();
    render();
    renderDebts();
    renderLoans();
  };

  expenseBtn.onclick = () => {
    const amount = Number(amountInput.value);
    const desc = description.value;

    if (!amount) return;

    addEntry("expense", amount, desc);

    updateBalances();
    render();
  };

  document.getElementById("debtsList").onclick = e => {
    const caja = getAccountTotal();

    if (e.target.dataset.pay) {
      const amount = Number(prompt("Monto"));
      if (amount > caja) return alert("Sin dinero");
      payDebt(Number(e.target.dataset.pay), amount);
    }

    if (e.target.dataset.payFull) {
      const debt = debts.find(d => d.id == e.target.dataset.payFull);
      if (debt.remaining > caja) return alert("Sin dinero");
      payDebt(debt.id, debt.remaining);
    }

    renderDebts();
    render();
    updateBalances();
  };

  document.getElementById("loansList").onclick = e => {
    if (e.target.dataset.loanPay) {
      payLoan(Number(e.target.dataset.loanPay));
      renderLoans();
      render();
      updateBalances();
    }
  };

  viewMovementsBtn.onclick = () => {
    mainScreen.classList.add("hidden");
    movementsScreen.classList.remove("hidden");
  };

  backFromMovements.onclick = () => {
    movementsScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
  };

  viewDebtsBtn.onclick = () => {
    mainScreen.classList.add("hidden");
    debtsScreen.classList.remove("hidden");
  };

  backFromDebts.onclick = () => {
    debtsScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
  };

  viewLoansBtn.onclick = () => {
    mainScreen.classList.add("hidden");
    loansScreen.classList.remove("hidden");
  };

  backFromLoans.onclick = () => {
    loansScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");
  };
}
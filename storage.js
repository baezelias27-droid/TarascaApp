export function save(data) {
  localStorage.setItem("financeApp", JSON.stringify(data));
}

export function load() {
  return JSON.parse(localStorage.getItem("financeApp")) || {
    ledger: [],
    debts: [],
    loans: []
  };
}
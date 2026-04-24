import { load } from "./storage.js";
import { setData } from "./ledger.js";
import { initEvents } from "./events.js";
import { render, renderDebts, renderLoans, updateBalances } from "./ui.js";

setData(load());

initEvents();
render();
renderDebts();
renderLoans();
updateBalances();
let rows = document.querySelectorAll("tr");
let totalSales = document.querySelector("#total");
let myEarnings = document.querySelector("#earnings");

let sales = [];
let earning = [];
rows.forEach((row) => {
  let salePrices = parseInt(row.children[4].innerHTML);
  let earnings = parseInt(row.children[5].innerHTML);
  console.log(salePrices);

  if (salePrices > 0) {
    sales.push(salePrices);
  }

  if (earnings > 0) {
    earning.push(earnings);
  }
});

let totalSalePrice = sales.reduce((total, num) => total + num, 0);
let totalEarnings = earning.reduce((total, num) => total + num, 0);

totalSales.innerHTML = "$" + " " + totalSalePrice;
myEarnings.innerHTML = "$" + " " + totalEarnings;

// console.log(myEarnings);

document.getElementById("transaction-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (!description || isNaN(amount)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    db.collection("transactions").add({ description, amount })
        .then(() => {
            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
            loadTransactions();
        });
});

function loadTransactions() {
    db.collection("transactions").get().then(snapshot => {
        let balance = 0;
        let expenses = [];
        document.getElementById("transaction-list").innerHTML = "";

        snapshot.forEach(doc => {
            let data = doc.data();
            let li = document.createElement("li");
            li.textContent = `${data.description}: ฿${data.amount}`;
            document.getElementById("transaction-list").appendChild(li);
            
            balance += data.amount;
            expenses.push(data.amount);
        });

        document.getElementById("balance").textContent = `฿${balance.toFixed(2)}`;
        updateChart(expenses);
    });
}

loadTransactions();

// Liste des programmes
let programs = JSON.parse(localStorage.getItem("programs")) || [];

// 🔐 PIN
const SECRET_PIN_PUBLISH = "1234";
const SECRET_PIN_DELETE = "1707";

// AFFICHAGE
function renderPrograms() {
    const list = document.getElementById("programList");
    if (!list) return;

    if (programs.length === 0) {
        list.innerHTML = "<p>Aucun programme publié.</p>";
    } else {
        list.innerHTML = "";
        programs.forEach((p, index) => {
            list.innerHTML += `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin:0;">${p.title}</h3>
                        <button class="btn delete-btn" onclick="deleteProgram(${index})">Supprimer</button>
                    </div>
                    <p>📅 ${p.date} | 🕒 ${p.time}</p>
                    <p>👤 Publié par : <strong>${p.author}</strong></p>
                    <p>${p.description}</p>
                </div>
            `;
        });
    }
}

// SUPPRESSION
function deleteProgram(index) {
    const pin = prompt("🔐 Entrez le code PIN pour supprimer :");
    if (pin !== SECRET_PIN_DELETE) {
        alert("❌ Code PIN incorrect ! Suppression refusée.");
        return;
    }

    programs.splice(index, 1);
    localStorage.setItem("programs", JSON.stringify(programs));
    renderPrograms();
}

// Initial render
renderPrograms();

// AJOUT (add.html)
const form = document.getElementById("programForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const userPin = document.getElementById("pin").value;

        if (userPin !== SECRET_PIN_PUBLISH) {
            alert("❌ Code PIN incorrect ! Publication refusée.");
            return;
        }

        const program = {
            author: document.getElementById("author").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value
        };

        programs.push(program);
        localStorage.setItem("programs", JSON.stringify(programs));

        alert("✅ Programme publié avec succès !");
        window.location.href = "index.html";
    });
}
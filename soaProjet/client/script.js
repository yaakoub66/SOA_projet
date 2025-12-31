const API_BASE = 'http://localhost:8080/serveur/api/persons';
let persons = [];

// Chargement initial
window.onload = function() {
    fetchPersons();
};

// Récupérer toutes les personnes
async function fetchPersons() {
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
        persons = await response.json();
        displayPersons(persons);
    } catch (error) {
        alert('Erreur de connexion au serveur : ' + error.message);
        console.error(error);
    }
}

// Afficher la liste (avec filtre)
function displayPersons(list) {
    const tbody = document.querySelector('#personsTable tbody');
    tbody.innerHTML = '';

    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Aucune personne trouvée</td></tr>';
        return;
    }

    list.forEach(person => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${person.id || '-'}</td>
            <td>${person.name}</td>
            <td>${person.age}</td>
            <td class="actions">
                <button class="btn-edit" onclick="openEditModal(${person.id})">Modifier</button>
                <button class="btn-delete" onclick="deletePerson(${person.id})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Recherche par nom
document.getElementById('searchInput').addEventListener('input', function(e) {
    const search = e.target.value.toLowerCase();
    const filtered = persons.filter(p => p.name.toLowerCase().includes(search));
    displayPersons(filtered);
});

// Ouvrir modal ajout
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter une personne';
    document.getElementById('personId').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('age').value = '';
    document.getElementById('personModal').style.display = 'block';
}

// Ouvrir modal modification
function openEditModal(id) {
    const person = persons.find(p => p.id === id);
    if (!person) return;

    document.getElementById('modalTitle').textContent = 'Modifier la personne';
    document.getElementById('personId').value = person.id;
    document.getElementById('nom').value = person.name;
    document.getElementById('age').value = person.age;
    document.getElementById('personModal').style.display = 'block';
}

// Fermer modal
function closeModal() {
    document.getElementById('personModal').style.display = 'none';
}

// Sauvegarder (ajout ou modification)
async function savePerson() {
    const id = document.getElementById('personId').value;
    const nom = document.getElementById('nom').value.trim();
    const age = document.getElementById('age').value;

    if (!nom || !age) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const person = { name: nom, age: parseInt(age) };

    try {
        let response;
        if (id) {
            // PUT - modification
            response = await fetch(`${API_BASE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(person)
            });
        } else {
            // POST - ajout
            response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(person)
            });
        }

        if (response.ok) {
            closeModal();
            fetchPersons(); // rafraîchir la liste
        } else {
            const errorText = await response.text();
            alert('Erreur lors de l\'enregistrement : ' + errorText);
        }
    } catch (error) {
        alert('Erreur réseau : ' + error.message);
    }
}

// Supprimer
async function deletePerson(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette personne ?')) return;

    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchPersons();
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        alert('Erreur réseau : ' + error.message);
    }
}

// Fermer modal en cliquant dehors
window.onclick = function(event) {
    const modal = document.getElementById('personModal');
    if (event.target === modal) {
        closeModal();
    }
}
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById("phone-number").value;
    
    // Appel simulé à une "base de données" JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const result = data[phoneNumber];
            const resultDiv = document.getElementById("result");

            if (result) {
                resultDiv.innerHTML = `
                    <h3>Résultats pour le numéro : ${phoneNumber}</h3>
                    <p><strong>Nom :</strong> ${result.name}</p>
                    <p><strong>Adresse :</strong> ${result.address}</p>
                    <p><strong>Autres informations :</strong> ${result.otherInfo}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p>Aucune information trouvée pour ce numéro.</p>`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

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
                // Générer les liens des réseaux sociaux s'ils existent
                let socialLinksHTML = '';
                if (result.socialLinks) {
                    for (const [network, link] of Object.entries(result.socialLinks)) {
                        socialLinksHTML += `<p><a href="${link}" target="_blank">${capitalize(network)}</a></p>`;
                    }
                }

                // Affichage des résultats
                resultDiv.innerHTML = `
                    <h3>Résultats pour le numéro : ${phoneNumber}</h3>
                    <img src="${result.photo}" alt="Photo de ${result.name}">
                    <p><strong>Nom :</strong> ${result.name}</p>
                    <p><strong>Adresse :</strong> ${result.address}</p>
                    <p><strong>Autres informations :</strong> ${result.otherInfo}</p>
                    <h4>Réseaux sociaux :</h4>
                    ${socialLinksHTML || "<p>Aucun lien disponible.</p>"}
                `;
            } else {
                resultDiv.innerHTML = `<p>Aucune information trouvée pour ce numéro.</p>`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

// Fonction pour capitaliser le premier caractère du nom du réseau social
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
    const contenu = document.getElementById('contenu');
    const nav = document.querySelector('nav');

    nav.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const page = e.target.getAttribute('href').slice(1);
            chargerPage(page);
        }
    });

    function chargerPage(page) {
        switch(page) {
            case 'accueil':
                contenu.innerHTML = '<h2>Bienvenue aux JO 2024</h2><p>Découvrez les épreuves passionnantes qui vous attendent.</p>';
                break;
            case 'offres':
                afficherOffres();
                break;
            case 'panier':
                contenu.innerHTML = '<h2>Votre panier</h2><p>Les billets sélectionnés apparaîtront ici.</p>';
                break;
            case 'connexion':
                afficherFormulaireConnexion();
                break;
            default:
                contenu.innerHTML = '<h2>Page non trouvée</h2>';
        }
    }

    async function afficherOffres() {
        try {
            const reponse = await fetch('/api/offres');
            const offres = await reponse.json();
            let html = '<h2>Offres disponibles</h2><ul>';
            offres.forEach(offre => {
                html += `<li>${offre.nom} - ${offre.prix}€ <button onclick="ajouterAuPanier(${offre.id})">Ajouter au panier</button></li>`;
            });
            html += '</ul>';
            contenu.innerHTML = html;
        } catch (erreur) {
            console.error('Erreur lors du chargement des offres:', erreur);
            contenu.innerHTML = '<p>Erreur lors du chargement des offres.</p>';
        }
    }

    function afficherFormulaireConnexion() {
        contenu.innerHTML = `
            <h2>Connexion</h2>
            <form id="formulaireConnexion">
                <input type="email" placeholder="Email" required>
                <input type="password" placeholder="Mot de passe" required>
                <button type="submit">Se connecter</button>
            </form>
        `;
        document.getElementById('formulaireConnexion').addEventListener('submit', (e) => {
            e.preventDefault();
            // Ici, vous ajouteriez la logique de connexion
            alert('Fonctionnalité de connexion à implémenter');
        });
    }

    // Charger la page d'accueil par défaut
    chargerPage('accueil');
});

function ajouterAuPanier(idOffre) {
    // Ici, vous ajouteriez la logique pour ajouter au panier
    alert(`Offre ${idOffre} ajoutée au panier`);
}
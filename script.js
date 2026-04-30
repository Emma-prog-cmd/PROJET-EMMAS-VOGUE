// Scroll horizontal par flèches
function scrollSection(btn, direction) {
    const grid = btn.closest('.scroll-wrapper').querySelector('.product-grid');
    grid.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const modalPanier = document.getElementById('modal-panier');
    const listeUl = document.getElementById('liste-panier');
    const totalSpan = document.getElementById('total-panier');
    const compteurHeader = document.getElementById('compteur-panier');

    let panier = [];

    // Ajout au panier
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-ajouter-panier') &&
            event.target.closest('.card')) {
            const btn = event.target;
            const card = btn.closest('.card');
            const nom = card.querySelector('h3').innerText;
            let prixTexte = card.querySelector('.price').innerText;
            let prixChiffre = parseInt(prixTexte.replace(/[^\d]/g, '')) || 0;

            panier.push({ nom, prix: prixChiffre });
            actualiserAffichage();

            const toast = document.getElementById('toast-notification');
            toast.innerText = nom + " ajouté avec succès ✅";
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
    });

    function actualiserAffichage() {
        listeUl.innerHTML = "";
        let sommeTotale = 0;
        panier.forEach((item) => {
            sommeTotale += item.prix;
            let li = document.createElement('li');
            li.innerHTML = `<span>${item.nom}</span><b>${item.prix.toLocaleString()} FCFA</b>`;
            listeUl.appendChild(li);
        });
        totalSpan.innerText = sommeTotale.toLocaleString();
        if (compteurHeader) compteurHeader.innerText = panier.length;
    }

    document.getElementById('btn-voir-panier').onclick = () => {
        modalPanier.style.display = 'flex';
    };
    document.querySelector('.close-panier').onclick = () => {
        modalPanier.style.display = 'none';
    };

    document.getElementById('btn-finaliser-commande').onclick = () => {
        if (panier.length === 0) {
            const toast = document.getElementById('toast-notification');
            toast.innerHTML = "Votre panier est vide ! 🛒";
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
            return;
        }

        let message = "Bonjour Emma's Vogue, voici ma commande :\n\n";
        panier.forEach(item => message += `- ${item.nom} : ${item.prix.toLocaleString()} FCFA\n`);
        message += "\nTotal : " + totalSpan.innerText + " FCFA";

        window.open(`https://wa.me/2290150509600?text=${encodeURIComponent(message)}`, '_blank');

        panier = [];
        actualiserAffichage();
        modalPanier.style.display = 'none';

        const toast = document.getElementById('toast-notification');
        toast.innerHTML = "Commande envoyée avec succès ✅";
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    };

    // Fermer modal commande
    const closeBtn = document.querySelector('.close');
    if (closeBtn) closeBtn.onclick = () => {
        document.getElementById('modal-commande').style.display = 'none';
    };
});

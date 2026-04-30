// Scroll horizontal par flèches
function scrollSection(btn, direction) {
    const grid = btn.closest('.scroll-wrapper').querySelector('.product-grid');
    grid.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

// Panier global
let panier = [];

function actualiserAffichage() {
    const listeUl = document.getElementById('liste-panier');
    const totalSpan = document.getElementById('total-panier');
    const compteurHeader = document.getElementById('compteur-panier');

    listeUl.innerHTML = "";
    let sommeTotale = 0;

    panier.forEach((item, index) => {
        sommeTotale += item.prix;
        let li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nom}</span>
            <div style="display:flex; align-items:center; gap:10px;">
                <b>${item.prix.toLocaleString()} FCFA</b>
                <span onclick="supprimerArticle(${index})" style="cursor:pointer; color:#999; font-size:20px; line-height:1;" onmouseover="this.style.color='#4B2C20'" onmouseout="this.style.color='#999'">&times;</span>
            </div>
        `;
        listeUl.appendChild(li);
    });

    totalSpan.innerText = sommeTotale.toLocaleString();
    if (compteurHeader) compteurHeader.innerText = panier.length;
}

function supprimerArticle(index) {
    panier.splice(index, 1);
    actualiserAffichage();
}

document.addEventListener('DOMContentLoaded', () => {
    const modalPanier = document.getElementById('modal-panier');

    // Ajout au panier
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-ajouter-panier') &&
            event.target.closest('.card')) {
            const card = event.target.closest('.card');
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

    // Ouvrir / fermer panier
    document.getElementById('btn-voir-panier').onclick = () => {
        modalPanier.style.display = 'flex';
    };
    document.querySelector('.close-panier').onclick = () => {
        modalPanier.style.display = 'none';
    };

    // Fermer modal commande
    const closeBtn = document.querySelector('.close');
    if (closeBtn) closeBtn.onclick = () => {
        document.getElementById('modal-commande').style.display = 'none';
    };

    // Finaliser commande
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
        message += "\nTotal : " + document.getElementById('total-panier').innerText + " FCFA";

        window.open(`https://wa.me/2290150509600?text=${encodeURIComponent(message)}`, '_blank');

        panier = [];
        actualiserAffichage();
        modalPanier.style.display = 'none';

        const toast = document.getElementById('toast-notification');
        toast.innerHTML = "Commande envoyée avec succès ✅";
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    };
});
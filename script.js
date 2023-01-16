document.getElementById('form-data').addEventListener('submit', function(event) {
    event.preventDefault(); // empêche le formulaire de soumettre les données de manière traditionnelle
    const data = document.getElementById('input-data').value; // récupère les données du champ de saisie

    // envoie une requête POST au serveur en lui transmettant les données du formulaire
    fetch('http://192.168.56.1:3000/path/to/server', {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) // traite la réponse du serveur
    .then(response => {
        const datas = response;
        const msg = String(datas.message);
        //parsing xml document
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(msg,"text/xml");
        let doc = xmlDoc.firstChild.firstChild.childNodes[1].innerHTML;
        //slice doc to get the note
        doc = '<div>' + doc.slice(9, -3)+ '</div>';
        let xmldoc2 = parser.parseFromString(doc,"text/xml");
        const donnee=[];
        xmldoc2.querySelectorAll("td").forEach(td => {
        if (td.textContent!==""){
            donnee.push(td.textContent);
        }
        });
        const jsonData = [];

        for (let i = 0; i < donnee.length; i += 5) {
        jsonData.push({
            date: donnee[i],
            matiere: donnee[i + 1],
            detail: donnee[i + 2],
            note: donnee[i + 3],
            intervenants: donnee[i + 4]
        })
        }
        // Get the cards container element
        const cardsContainer = document.getElementById('cardsContainer');

        // Loop through the data and create a card for each item
        jsonData.forEach(item => {
            // Create the card element
            const card = document.createElement('div');
            card.classList.add('card');

            // Create the title element
            const title = document.createElement('h1');
            title.classList.add('title');
            title.textContent = item.matiere;

            // Create the note element
            const note = document.createElement('p');
            note.classList.add('note');
            note.textContent = `Note : ${item.note}`;

            // Append the title, note, and button to the card
            card.appendChild(title);
            card.appendChild(note);

            // Append the card to the cards container
            cardsContainer.appendChild(card);
        });
        document.getElementById('cardsContainer').style.visibility = 'visible';
        document.getElementById('container').style.display = 'none';
    });
});


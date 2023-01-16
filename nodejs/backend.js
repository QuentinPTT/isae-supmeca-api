const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// configure cors pour autoriser toutes les origines à accéder aux ressources du serveur
app.use(cors());

// configure body-parser pour récupérer les données envoyées dans la requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/path/to/server', (req, res) => {
    const newcookie = req.body.data; // récupère les données envoyées dans la requête
    // traite les données et renvoie une réponse au client
    const request = require('request');

    const options = {
        method: 'POST',
        url: 'https://scolarite.supmeca.fr/faces/LearnerNotationListPage.xhtml',
        headers: {
          Accept: 'application/xml, text/xml, */*; q=0.01',
          'Accept-Language': 'fr-FR,fr;q=0.7',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Cookie: 'JSESSIONID='+newcookie,
          'Faces-Request': 'partial/ajax',
          Origin: 'https://scolarite.supmeca.fr',
          Referer: 'https://scolarite.supmeca.fr/faces/LearnerNotationListPage.xhtml',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-GPC': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          'sec-ch-ua': '"Not_A Brand";v="99", "Brave";v="109", "Chromium";v="109"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        },
        form: {
          'javax.faces.partial.ajax': 'true',
          'javax.faces.source': 'form:dataTableFavori',
          'javax.faces.partial.execute': 'form:dataTableFavori',
          'javax.faces.partial.render': 'form:dataTableFavori',
          'javax.faces.behavior.event': 'filter',
          'javax.faces.partial.event': 'filter',
          'form:dataTableFavori_filtering': 'true',
          'form:dataTableFavori_encodeFeature': 'true',
          form: 'form',
          'form:largeurDivCenter': '682',
          'form:idInit': 'webscolaapp.LearnerNotationListPage_-6464676572984812744',
          'form:dataTableFavori_reflowDD': '0_0',
          'form:dataTableFavori:globalFilter': '',
          'form:dataTableFavori:j_idt113:filter': '',
          'form:dataTableFavori:j_idt115:filter': '',
          'form:dataTableFavori:j_idt117:filter': '',
          'form:dataTableFavori:j_idt119:filter': '',
          'form:dataTableFavori:j_idt121:filter': '',
          'form:dataTableFavori:j_idt123:filter': '',
          'form:dataTableFavori:j_idt125:filter': '',
          'form:j_idt157_focus': '',
          'form:j_idt157_input': '43758',
          'javax.faces.ViewState': '-2864270412486843937:8144186463313823809'
        }
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
        const rep = { message: `${body}` };
        res.send(rep);
    });

});

app.listen(3000, () => console.log('Server listening on port 3000'));
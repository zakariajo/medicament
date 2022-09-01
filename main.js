let textinput = document.getElementById("text-input");
let valide = document.getElementById("submit-btn");
let name = document.querySelector(".name");
let dosage = document.querySelector(".dosage");
let unite = document.querySelector(".unite");
let forme = document.querySelector(".forme");
let code = document.querySelector(".code");
let rmb = document.querySelector(".remboursable");
let nrmb = document.querySelector(".Nremboursable");
let ppv = document.querySelector(".ppv");
let pbr = document.querySelector(".pbr");
let mainbody = document.querySelector(".main-body");
// let i = 0;
let MedObj;
let medicine;
let count = 0;


medicine = new XMLHttpRequest();
medicine.open("GET", "medicaments.json", true);
medicine.send();
medicine.onload = function () {
    MedObj = JSON.parse(medicine.response);
    valide.onclick = function () {
        mainbody.innerHTML = "";
        count = 0;
        let pattern = "";
        for (let i = 0; i < MedObj.length; i++) {
            if (MedObj[i].NOM.toLowerCase().startsWith(textinput.value.toLowerCase(), 0)) {
                document.getElementById("notfound").style.display = "none";
                pattern += `
                <div class="box">
                <h2 class="name">${MedObj[i].NOM}</h2>
                <div class="info-medicament">
                    <p> <span class="dosage">${MedObj[i].DOSAGE1}</span> <span class="unite">${MedObj[i].UNITE_DOSAGE1}</span> <span class="presentation">${MedObj[i].PRESENTATION}</span></p>
                    <p class="forme">${MedObj[i].FORME}</p>
                </div>
                <p class="code">${MedObj[i].CODE}</p>
                ${parseInt(MedObj[i].TAUX_REMBOURSEMENT) != 0 ? '<p class="remboursable">remboursable</p>' : ' <p class="Nremboursable">non remboursable</p>'}
                <p class="ppv"> <span>PPV-</span> ${MedObj[i].PPV} <span class="price">DH</span></p>
                <p class="pbr"> <span>PBR-</span> ${MedObj[i].PRIX_BR} <span>DH</span></p>
            </div>`;

                mainbody.innerHTML = pattern;
            } else {
                count++;
                // pattern = "<p>not found</p>";
            };
        };

        textinput.value = "";
        textinput.focus();

        // i = 0;
        if (count === MedObj.length) {
            mainbody.innerHTML = "";
            // document.querySelector(".notfound").style.display = "block !important";
            document.getElementById("notfound").style.display = "block";
        };
        return false;
    };
};
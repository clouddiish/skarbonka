const model = {
    filtrTyp: "",           // aktualny filtr typu transakcji
    filtrKategoria: "",     // ktualny filtr kategorii transakcji
    sumaPrzychodow: 0,      // aktualna suma przychodów po przefilrowaniu
    sumaWydatkow: 0,        // aktualna suma wydatków po przefiltrowaniu
    bilans: 0,              // aktualny bilans po przefiltrowaniu

    // dane transakcji
    transakcje: [
        {
            id: 0,
            data: "2024-04-16",
            wartosc: 20,
            typ: "Wydatek",
            kategoria: "Jedzenie"
        },
        {
            id: 1,
            data: "2024-04-15",
            wartosc: 30,
            typ: "Wydatek",
            kategoria: "Jedzenie"
        },
        {
            id: 2,
            data: "2024-04-16",
            wartosc: 200,
            typ: "Wydatek",
            kategoria: "Lekarz"
        },
        {
            id: 3,
            data: "2024-04-16",
            wartosc: 2500,
            typ: "Przychód",
            kategoria: "Pensja"
        },
        {
            id: 4,
            data: "2024-04-16",
            wartosc: 1000,
            typ: "Przychód",
            kategoria: "Babcia"
        }
    ],

    kategorie: [
        {
            nazwa: "Jedzenie",
            dotyczyTypu: "Wydatek"
        },
        {
            nazwa: "Lekarz",
            dotyczyTypu: "Wydatek"
        },
        {
            nazwa: "Pensja",
            dotyczyTypu: "Przychód"
        },
        {
            nazwa: "Babcia",
            dotyczyTypu: "Przychód"
        }
    ]
}

const view = {

    // metoda do inicjacji view
    init() {

        // uzupełnij ciało tabeli
        this.updateTabela();

        // uzupełnij listę kategorii
        this.updateDodajKategorie();
        this.updateFiltrujKategorie();

        // uzupełnij dane na podstawie wszystkich transakcji
        this.updateWartosci();

        // po naciśnieciu guzika "Dodaj" zapisanie wpisanych wartości do obiektu
        this.dodajBTN.addEventListener("click", () => {
            controller.addTransakcja();
            controller.setWszystko();
            this.updateWartosci();
            this.updateTabela();
        });

        // po naciśnięciu guzika "Filtruj" aktualizacja HTMLa
        this.filtrujBTN.addEventListener("click", () => {
            controller.setFiltry();
            controller.setWszystko();
            this.updateWartosci();
            this.updateTabela();
        });

        // po naciśnięciu "usuń" usuwanie transakcji
        this.tabelaTransakcji.addEventListener("click", (event) => {
            if (event.target.className === "delete btn btn-light") {
                const id = parseInt(event.target.parentElement.id);
                controller.usunTransakcje(id);
                this.updateWartosci();
                this.updateTabela();
            }
        });

        // po naciśnięciu guzika "edytuj" edytowanie
        this.tabelaTransakcji.addEventListener("click", (event) => {
            if (event.target.className === "edit btn btn-light") {
                const id = parseInt(event.target.parentElement.id);
                this.wyswietlFormularzEdycji(id);


                // controller.edytujTransakcje(id);

                // ?? czy to tu? -> dopiero po naciśnięciu zapisz
                // this.updateWartosci(); 
                // this.updateTabela();
            }
        });
    },

    // metoda do zapisania wskaźników na elementy DOM
    setDOM() {

        // zapisanie wskaźników do formularzy i guzików dodawania transakcji
        this.data = document.getElementById("data");

        this.wartosc = document.getElementById("wartosc");
        this.wartoscKom = document.getElementById("wartoscKom");

        this.dtyp = document.getElementById("dtyp");

        this.dkategoria = document.getElementById("dkategoria");
        this.listaKategorii = document.getElementById("listaKategorii");

        this.dodajBTN = document.getElementById("dodajBTN");

        // zapisanie wskaźników do formularzy i guzików do filtrowania transakcji
        this.ftyp = document.getElementById("ftyp");
        this.fkategorie = document.getElementById("fkategorie");
        this.filtrujBTN = document.getElementById("filtrujBTN");

        // zapisanie wskaźników do wartości podsumowujących
        this.sumaPrzychodow = document.getElementById("sumaPrzychodow");
        this.sumaWydatkow = document.getElementById("sumaWydatkow");
        this.wartoscBilansu = document.getElementById("wartoscBilansu");

        // zapisanie wskaźników do tabeli
        this.tabelaTransakcji = document.getElementById("tabelaTransakcji");
        this.cialoTabeli = document.getElementById("cialoTabeli");
    },

    // metoda do aktualizowania wartości podsumowujących
    updateWartosci() {
        this.sumaPrzychodow.innerHTML = controller.getSumaPrzychodow();
        this.sumaWydatkow.innerHTML = controller.getSumaWydatkow();
        this.wartoscBilansu.innerHTML = controller.getBilans();
    },

    // metoda do aktualizowania tabeli
    updateTabela() {
        this.cialoTabeli.innerHTML = "";
        controller.getTransakcjeByFiltry(
            controller.getFiltrTyp(),
            controller.getFiltrKategoria()).forEach(element =>
                cialoTabeli.innerHTML +=
                `<tr>
                        <td>${element.data}</td>
                        <td>${element.wartosc}</td>
                        <td>${element.typ}</td>
                        <td>${element.kategoria}</td>
                        <td id=${element.id}>
                            <button type="button" class="edit btn btn-light">Edytuj</button>
                        </td>
                        <td id=${element.id}>
                            <button type="button" class="delete btn btn-light">Usuń</button>
                        </td>
                        
                    </tr>`);
    },

    updateDodajKategorie() {
        this.listaKategorii.innerHTML = "";
        controller.getKategorie().forEach(element =>
            listaKategorii.innerHTML += `<option value=${element.nazwa}>`
        );

    },

    updateFiltrujKategorie() {
        this.fkategorie.innerHTML = '<option value="">Wszystko</option>';
        controller.getKategorie().forEach(element =>
            fkategorie.innerHTML += `<option value=${element.nazwa}>${element.nazwa}</option>`
        )
    },

    updateKomunikatWartosc(komunikat) {
        this.wartoscKom.innerHTML = komunikat;
    },

    wyswietlFormularzEdycji(idOdView) {
        let edytowanyWiersz = document.getElementById(idOdView).parentElement;

        edytowanyWiersz.innerHTML = `
            <td>
                <input type="date" id="edata" placeholder="2024-04-01">
            </td>
            <td>
                <input type="number" id="ewartosc" step="0.01" placeholder="20">
            </td>
            <td>
                <select id="etyp">
                    <option value="Wydatek">Wydatek</option>
                    <option value="Przychód">Przychód</option>
                </select>
            </td>
            <td>
                <input list="elistaKategorii" name="browser" id="ekategoria" class="listaKategorii">
                <datalist id="elistaKategorii">
            </td>
            <td>
                <button id="ezapiszBTN" class="btn btn-light">Zapisz</button>
            </td>
            <td>
                <button id="eanulujBTN" class="btn btn-light">Anuluj</button>
            </td>`;

    }

}

const controller = {
    // metoda do inicjalizacji kontrolera
    init() {
        // ustaw sumy w modelu
        this.setSumaTransakcji("Przychód");
        this.setSumaTransakcji("Wydatek");
        this.setBilans();

        // zainicjuj view
        view.setDOM();
        view.init();

    },

    // pobierz aktualny filtr typu z modelu
    getFiltrTyp() {
        return model.filtrTyp;
    },

    // pobierz aktualny filtr kategorii z modelu
    getFiltrKategoria() {
        return model.filtrKategoria;
    },

    // ustaw nowe filtry wybrane przez użytkownika w modelu
    setFiltry() {
        model.filtrTyp = view.ftyp.value;
        model.filtrKategoria = view.fkategorie.value;
    },

    // dodaj nową transakcję wpisaną przez użytkownika do modelu 
    addTransakcja() {
        nowaTransakcja = {};

        nowaTransakcja.id = model.transakcje[model.transakcje.length - 1].id + 1;
        nowaTransakcja.data = view.data.value;

        if (view.wartosc.value !== "") {
            nowaTransakcja.wartosc = Number(view.wartosc.value);
            view.updateKomunikatWartosc("");
        } else {
            view.updateKomunikatWartosc("Proszę podać liczbę");
            return;
        }

        nowaTransakcja.typ = view.dtyp.value;

        nowaTransakcja.kategoria = view.dkategoria.value;
        if (!this.czyKategoriaIstnieje()) {
            nowaKategoria = {};

            nowaKategoria.nazwa = view.dkategoria.value;

            model.kategorie.push(nowaKategoria);

            view.updateDodajKategorie();
            view.updateFiltrujKategorie();
        }

        model.transakcje.push(nowaTransakcja);
    },

    // pobierz wyfiltrowaną tabelę wszystkich transakcji z modelu zgodnie z aktualnymi filtrami
    getTransakcjeByFiltry(typp = "", katt = "") {
        if ((typp === "") && (katt === "")) {
            return model.transakcje;

        } else if ((typp !== "") && (katt === "")) {
            return model.transakcje.filter(
                (transakcja) => { return (transakcja.typ == typp) }
            );

        } else if ((typp === "") && (katt !== "")) {
            return model.transakcje.filter(
                (transakcja) => { return (transakcja.kategoria == katt) }
            );

        } else {
            return model.transakcje.filter(
                (transakcja) => { return (transakcja.typ == typp) && (transakcja.kategoria == katt) }
            );
        }

    },

    // pobierz aktualną sumę przychodów z modelu 
    getSumaPrzychodow() {
        return model.sumaPrzychodow;
    },

    // pobierz aktualną sumę wydatków z modelu 
    getSumaWydatkow() {
        return model.sumaWydatkow;
    },

    // pobierz aktualny bilans z modelu
    getBilans() {
        return model.bilans;
    },

    // ustaw nową sumę transakcji o podanym typie i kategorii
    findSumaTransakcji(typp, katt = "") {
        let suma = 0;

        for (let transakcja of this.getTransakcjeByFiltry(typp, katt)) {
            if (transakcja.typ == typp) suma = suma + transakcja.wartosc;
        }

        return suma;
    },

    setSumaTransakcji() {
        if (model.filtrTyp == "Przychód") {
            model.sumaPrzychodow = this.findSumaTransakcji("Przychód", model.filtrKategoria);
            model.sumaWydatkow = 0;
        } else if (model.filtrTyp == "Wydatek") {
            model.sumaWydatkow = this.findSumaTransakcji("Wydatek", model.filtrKategoria);
            model.sumaPrzychodow = 0;
        } else if (model.filtrTyp == "") {
            model.sumaPrzychodow = this.findSumaTransakcji("Przychód", model.filtrKategoria);
            model.sumaWydatkow = this.findSumaTransakcji("Wydatek", model.filtrKategoria);
        }
    },

    // ustaw aktualny bilans
    setBilans() {
        model.bilans = this.getSumaPrzychodow() - this.getSumaWydatkow();
    },

    // ustaw wszystkie potrzebne rzeczy po wyfiltrowaniu
    setWszystko() {

        if (model.filtrTyp == "") {

        }

        this.setSumaTransakcji();
        this.setBilans();
    },

    znajdzIndeksTransakcji(idOdView) {
        for (let i = 0; i < model.transakcje.length; i++) {
            if (idOdView == model.transakcje[i].id) return i;

        }
    },

    usunTransakcje(idOdView) {
        model.transakcje.splice(this.znajdzIndeksTransakcji(idOdView), 1);
        this.setWszystko();
    },

    edytujTransakcje(idOdView) {
        // let data = prompt("Podaj nową datę");
        // let wartosc = Number(prompt("Podaj nową wartość"));
        // let typ = prompt("Podaj nowy typ");
        // let kategoria = prompt("Podaj nową kategorię");

        for (let transakcja of model.transakcje) {
            if (transakcja.id == idOdView) {
                transakcja.data = data;
                transakcja.wartosc = wartosc;
                transakcja.typ = typ;
                transakcja.kategoria = kategoria;
                break;
            }
        }

        this.setWszystko();
    },

    czyKategoriaIstnieje() {
        for (let kategoria of model.kategorie) {
            if (kategoria.nazwa == view.dkategoria.value) return true;
        }

        return false;
    },

    getKategorie() {
        return model.kategorie;
    }
}

// inicjacja kontrolera
controller.init();
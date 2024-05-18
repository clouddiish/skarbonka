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
    ]
}

const view = {

    // metoda do inicjacji view
    init() {

        // uzupełnij ciało tabeli

        this.updateTabela();

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
                controller.edytujTransakcje(id);
                this.updateWartosci();
                this.updateTabela();
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
        this.dkategoria = document.getElementById("dkat");
        this.dodajBTN = document.getElementById("dodajBTN");

        // zapisanie wskaźników do formularzy i guzików do filtrowania transakcji
        this.ftyp = document.getElementById("ftyp");
        this.fkategoria = document.getElementById("fkat");
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

    updateKomunikatWartosc(komunikat){
        this.wartoscKom.innerHTML = komunikat;
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
        model.filtrKategoria = view.fkategoria.value;
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
    setSumaTransakcji(typp, katt = "") {
        let suma = 0;

        for (let transakcja of this.getTransakcjeByFiltry(typp, katt)) {
            if (transakcja.typ == typp) suma = suma + transakcja.wartosc;
        }

        if (typp === "Przychód") {
            model.sumaPrzychodow = suma;
        } else if (typp === "Wydatek") {
            model.sumaWydatkow = suma;
        }
    },

    // ustaw aktualny bilans
    setBilans() {
        return model.bilans = this.getSumaPrzychodow() - this.getSumaWydatkow();
    },

    // ustaw wszystkie potrzebne rzeczy po wyfiltrowaniu
    setWszystko() {
        this.setSumaTransakcji("Przychód", view.fkategoria.value);
        this.setSumaTransakcji("Wydatek", view.fkategoria.value);
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
        let data = prompt("Podaj nową datę");
        let wartosc = Number(prompt("Podaj nową wartość"));
        let typ = prompt("Podaj nowy typ");
        let kategoria = prompt("Podaj nową kategorię");

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
    }
}

// inicjacja kontrolera
controller.init();
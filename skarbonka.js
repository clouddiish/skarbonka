const model = {
    filtrTyp: "",           // aktualny filtr typu transakcji
    filtrKategoria: "",     // ktualny filtr kategorii transakcji
    sumaPrzychodow: 0,      // aktualna suma przychodów po przefilrowaniu
    sumaWydatkow: 0,        // aktualna suma wydatków po przefiltrowaniu
    bilans: 0,              // aktualny bilans po przefiltrowaniu

    // lista transakcji
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
        },
        {
            id: 5,
            data: "2024-04-17",
            wartosc: 50,
            typ: "Wydatek",
            kategoria: "Transport"
        },
        {
            id: 6,
            data: "2024-04-17",
            wartosc: 150,
            typ: "Wydatek",
            kategoria: "Jedzenie"
        },
        {
            id: 7,
            data: "2024-04-18",
            wartosc: 300,
            typ: "Wydatek",
            kategoria: "Lekarz"
        },
        {
            id: 8,
            data: "2024-04-18",
            wartosc: 500,
            typ: "Wydatek",
            kategoria: "Rachunki"
        },
        {
            id: 9,
            data: "2024-04-19",
            wartosc: 80,
            typ: "Wydatek",
            kategoria: "Jedzenie"
        },
        {
            id: 10,
            data: "2024-04-19",
            wartosc: 70,
            typ: "Wydatek",
            kategoria: "Ubrania"
        },
        {
            id: 11,
            data: "2024-04-20",
            wartosc: 2500,
            typ: "Wydatek",
            kategoria: "Rachunki"
        },
        {
            id: 12,
            data: "2024-04-20",
            wartosc: 100,
            typ: "Wydatek",
            kategoria: "Transport"
        },
        {
            id: 13,
            data: "2024-04-21",
            wartosc: 1500,
            typ: "Przychód",
            kategoria: "Pensja"
        },
        {
            id: 14,
            data: "2024-04-21",
            wartosc: 200,
            typ: "Wydatek",
            kategoria: "Ubrania"
        }
        
    ],

    // lista kategorii
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
        },
        {
            nazwa: "Transport",
            dotyczyTypu: "Wydatek"
        },
        {
            nazwa: "Rachunki",
            dotyczyTypu: "Wydatek"
        },
        {
            nazwa: "Ubrania",
            dotyczyTypu: "Wydatek"
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
            controller.dodajTransakcje(
                this.data.value,
                this.wartosc.value,
                this.dtyp.value,
                this.dkategoria.value
            );
            controller.setWszystko();
            this.updateWartosci();
            this.updateTabela();
            this.updateDodajKategorie();
            this.updateFiltrujKategorie();
        });

        // po naciśnięciu guzika "Filtruj" aktualizacja HTMLa
        this.filtrujBTN.addEventListener("click", () => {
            controller.setFiltry();
            controller.setWszystko();
            this.updateWartosci();
            this.updateTabela();
        });

        // po naciśnięciu "Usuń" usuwanie transakcji
        this.tabelaTransakcji.addEventListener("click", (event) => {
            if (event.target.className === "delete btn btn-light") {
                const id = parseInt(event.target.parentElement.id);
                controller.usunTransakcje(id);
                this.updateWartosci();
                this.updateTabela();
            }
        });

        // po naciśnięciu guzika "Edytuj" edytowanie
        this.tabelaTransakcji.addEventListener("click", (event) => {
            if (event.target.className === "edit btn btn-light") {
                let id = parseInt(event.target.parentElement.id);
                this.wyswietlFormularzEdycji(id);
                this.setDOMedycja(id);
                this.updateEdytujKategorie();
            }
        });

        // po naciśnięciu guzyka "Zapisz" nowe dane transakcji są zapisywane do modelu
        this.tabelaTransakcji.addEventListener("click", (event) => {
            if (event.target.className == "save btn btn-light") {
                let id = parseInt(event.target.parentElement.id);

                this.setDOMedycja(id);
                controller.setEdytujTransakcje(id);
                this.updateDodajKategorie();
                this.updateFiltrujKategorie();
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

    // zapisanie wskaźników do elementów edycji transakcji
    setDOMedycja(idOdView) {

        this.edata = document.getElementById(`edata${idOdView}`);
        this.ewartosc = document.getElementById(`ewartosc${idOdView}`);
        this.ewartoscKom = document.getElementById(`ewartoscKom${idOdView}`)
        this.etyp = document.getElementById(`etyp${idOdView}`);
        this.ekategoria = document.getElementById(`ekategoria${idOdView}`);
        this.elistaKategorii = document.getElementById(`elistaKategorii${idOdView}`);
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

    // zaktualizuj listę rozwijaną kategorii przy dodawaniu transakcji
    updateDodajKategorie() {
        this.listaKategorii.innerHTML = "";
        controller.getKategorie().forEach(element =>
            listaKategorii.innerHTML += `<option value=${element.nazwa}>`
        );

    },

    // zaktualizuj listę rozwijaną kategorii przy filtrowaniu transakcji
    updateFiltrujKategorie() {
        this.fkategorie.innerHTML = '<option value="">Wszystko</option>';
        controller.getKategorie().forEach(element =>
            fkategorie.innerHTML += `<option value=${element.nazwa}>${element.nazwa}</option>`
        )
    },

    // zaktualizuj treść komunikatu pod wartością przy dodawaniu transakcji
    updateKomunikatWartosc(komunikat) {
        this.wartoscKom.innerHTML = komunikat;
    },

    // wyświetl formularz edycji przy transakcji o zadanym HTML-owym ID od view 
    wyswietlFormularzEdycji(idOdView) {
        let edytowanyWiersz = document.getElementById(idOdView).parentElement;

        edytowanyWiersz.innerHTML = `
            <td>
                <input type="date" id="edata${idOdView}" placeholder="2024-04-01" class="form-control">
            </td>
            <td>
                <input type="number" id="ewartosc${idOdView}" step="0.01" placeholder="20" class="form-control">
                <p id="ewartoscKom${idOdView}" class="komunikat my-2"></p>
            </td>
            <td>
                <select id="etyp${idOdView}" class="form-control">
                    <option value="Wydatek">Wydatek</option>
                    <option value="Przychód">Przychód</option>
                </select>
            </td>
            <td>
                <input list="elistaKategorii${idOdView}" id="ekategoria${idOdView}" class="listaKategorii form-control">
                <datalist id="elistaKategorii${idOdView}">
                </datalist>
            </td>
            <td id=${idOdView}>
                <button class="save btn btn-light">Zapisz</button>
            </td>
            <td>
            </td>`;
    },

    // ukryj formularz edycji przy zadanym HTML-owym ID od view
    ukryjFormularzEdycji(idOdView) {
        let edytowanyWiersz = document.getElementById(idOdView).parentElement;

        edytowanyWiersz.innerHTML =
            `<tr>
                <td>${controller.getDataPoId(idOdView)}</td>
                <td>${controller.getWartoscPoId(idOdView)}</td>
                <td>${controller.getTypPoId(idOdView)}</td>
                <td>${controller.getKategoriaPoId(idOdView)}</td>
                <td id=${idOdView}>
                    <button type="button" class="edit btn btn-light">Edytuj</button>
                </td>
                <td id=${idOdView}>
                    <button type="button" class="delete btn btn-light">Usuń</button>
                </td>
            </tr>`
    },

    // zaktualizuj treść komunikatu pod wartością przy edycji transakcji
    updateKomunikatWartoscE(komunikat) {
        this.ewartoscKom.innerHTML = komunikat;
    },

    // zaktualizuj listę rozwijaną kategorii przy edycji transakcji
    updateEdytujKategorie() {
        this.elistaKategorii.innerHTML = "";
        controller.getKategorie().forEach(element =>
            this.elistaKategorii.innerHTML += `<option value=${element.nazwa}>`
        );

    },
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
    dodajTransakcje(data, wartosc, typ, kategoria) {
        nowaTransakcja = {};

        nowaTransakcja.id = model.transakcje[model.transakcje.length - 1].id + 1;
        nowaTransakcja.data = data;

        if (wartosc !== "") {
            nowaTransakcja.wartosc = Number(wartosc);
            view.updateKomunikatWartosc("");
        } else {
            view.updateKomunikatWartosc('<i class="bi bi-exclamation-circle"></i> Proszę podać liczbę');
            return;
        }

        nowaTransakcja.typ = typ;

        nowaTransakcja.kategoria = kategoria;
        if (!this.czyKategoriaIstnieje(nowaTransakcja.kategoria)) 
            this.addNowaKategorie(nowaTransakcja.kategoria);

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

    // oblicz nową sumę transakcji o podanym typie i kategorii
    obliczSumeTransakcji(typp, katt = "") {
        let suma = 0;

        for (let transakcja of this.getTransakcjeByFiltry(typp, katt)) {
            if (transakcja.typ == typp) suma = suma + transakcja.wartosc;
        }

        return suma;
    },

    // ustaw wartości podsumowujące w modelu
    setSumaTransakcji() {
        if (model.filtrTyp == "Przychód") {
            model.sumaPrzychodow = this.obliczSumeTransakcji("Przychód", model.filtrKategoria);
            model.sumaWydatkow = 0;
        } else if (model.filtrTyp == "Wydatek") {
            model.sumaWydatkow = this.obliczSumeTransakcji("Wydatek", model.filtrKategoria);
            model.sumaPrzychodow = 0;
        } else if (model.filtrTyp == "") {
            model.sumaPrzychodow = this.obliczSumeTransakcji("Przychód", model.filtrKategoria);
            model.sumaWydatkow = this.obliczSumeTransakcji("Wydatek", model.filtrKategoria);
        }
    },

    // ustaw aktualny bilans
    setBilans() {
        model.bilans = this.getSumaPrzychodow() - this.getSumaWydatkow();
    },

    // ustaw wszystkie potrzebne rzeczy po wyfiltrowaniu
    setWszystko() {
        this.setSumaTransakcji();
        this.setBilans();
    },

    // znajdź indeks z modelu znając HTML-owe ID od view
    znajdzIndeksTransakcji(idOdView) {
        for (let i = 0; i < model.transakcje.length; i++) {
            if (idOdView == model.transakcje[i].id) return i;

        }
    },

    // usuń transakcję o HTML-owym ID od view
    usunTransakcje(idOdView) {
        model.transakcje.splice(this.znajdzIndeksTransakcji(idOdView), 1);
        this.setWszystko();
    },

    // edytuje transakcję o HTML-owym ID od view
    setEdytujTransakcje(idOdView) {

        if (view.ewartosc.value !== "") {
            for (let transakcja of model.transakcje) {
                if (transakcja.id == idOdView) {
                    transakcja.data = view.edata.value;
                    transakcja.wartosc = Number(view.ewartosc.value);
                    transakcja.typ = view.etyp.value;
                    transakcja.kategoria = view.ekategoria.value;
                    break;
                }
            }
            view.updateKomunikatWartoscE("");
        } else {
            view.updateKomunikatWartoscE('<i class="bi bi-exclamation-circle"></i> Proszę podać liczbę');
            return;
        }

        let nowaKategoria = view.ekategoria.value;
        if (!this.czyKategoriaIstnieje(nowaKategoria)) 
            this.addNowaKategorie(nowaKategoria);

        this.setWszystko();

        view.updateWartosci();
        view.ukryjFormularzEdycji(idOdView);
    },

    // sprawdź, czy kategoria wpisana przy dodawaniu transakcji już istnieje w modelu
    czyKategoriaIstnieje(nazwaKategorii) {
        for (let kategoria of model.kategorie) {
            if (kategoria.nazwa == nazwaKategorii) return true;
        }

        return false;
    },

    addNowaKategorie(nazwaKategorii) {
        nowaKategoria = {};
        nowaKategoria.nazwa = nazwaKategorii;
        model.kategorie.push(nowaKategoria);
    },

    // pobierz wszystkie kategorie z modelu
    getKategorie() {
        return model.kategorie;
    },

    // pobierz datę transakcji o zadanym HTML-owym ID od view
    getDataPoId(idOdView) {
        for (let transakcja of model.transakcje) {
            if (transakcja.id == idOdView) {
                return transakcja.data;
            }
        }
    },

    // pobierz wartość transakcji o zadanym HTML-owym ID od view
    getWartoscPoId(idOdView) {
        for (let transakcja of model.transakcje) {
            if (transakcja.id == idOdView) {
                return transakcja.wartosc;
            }
        }
    },

    // pobierz typ transakcji o zadanym HTML-owym ID od view
    getTypPoId(idOdView) {
        for (let transakcja of model.transakcje) {
            if (transakcja.id == idOdView) {
                return transakcja.typ;
            }
        }
    },

    // pobierz kategorię transakcji o zadanym HTML-owym ID od view
    getKategoriaPoId(idOdView) {
        for (let transakcja of model.transakcje) {
            if (transakcja.id == idOdView) {
                return transakcja.kategoria;
            }
        }
    }
}

// inicjacja kontrolera
controller.init();
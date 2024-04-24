const model = {
    filtrTyp: "",           // zapamiętanie aktualnego filtru typu transakcji
    filtrKategoria: "",     // zapamiętanie aktualnego filtru kategorii transakcji
    sumaPrzychodow: 0,      // aktualna suma przychodów po przefilrowaniu
    sumaWydatkow: 0,        // aktualna suma wydatków po przefiltrowaniu
    bilans: 0,              // aktualny bilans po przefiltrowaniu

    // dane transakcji
    transakcje: [
        {
            data: "2024-04-16",
            wartosc: 20,
            typ: "wydatek",
            kategoria: "jedzenie"
        },
        {
            data: "2024-04-15",
            wartosc: 30,
            typ: "wydatek",
            kategoria: "jedzenie"
        },
        {
            data: "2024-04-16",
            wartosc: 200,
            typ: "wydatek",
            kategoria: "lekarz"
        },
        {
            data: "2024-04-16",
            wartosc: 1000,
            typ: "przychód",
            kategoria: "Pensja"
        },
        {
            data: "2024-04-16",
            wartosc: 100000,
            typ: "przychód",
            kategoria: "Babcia"
        }
    ]
}

const view = {

    // metoda do inicjacji view
    init() {

        // DODAWANIE TRANSAKCJI

        // zapisanie wskaźników do formularzy i guzików
        this.data = document.getElementById("data");
        this.wartosc = document.getElementById("wartosc");
        this.dtyp = document.getElementById("dtyp");
        this.dkategoria = document.getElementById("dkat");
        this.dodajBTN = document.getElementById("dodajBTN");

        // po naciśnieciu guzika zapisanie wpisanych wartości do obiektu
        this.dodajBTN.addEventListener("click", () => controller.addTransakcja());


        // FILTROWANIE HISTORII TRANSAKCJI

        // zapisanie wskaźników do formularzy i guzików
        this.ftyp = document.getElementById("ftyp");
        this.fkategoria = document.getElementById("fkat");
        this.filtrujBTN = document.getElementById("filtrujBTN");

        // po naciśnięciu guzika aktualizacja wartości
        this.filtrujBTN.addEventListener("click", () => controller.setFiltry());

    },

    // metoda do aktualizowania HTMLa
    render() {
        const filtrTyp = controller.getFiltrTyp();
        const filtrKategoria = controller.getFiltrKategoria();
    }

}

const controller = {
    // metoda do inicjalizacji kontrolera
    init() {
        // zainicjuj view
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

        nowaTransakcja.data = view.data.value;
        nowaTransakcja.wartosc = view.wartosc.value;
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
    getBilans(){
        return model.bilans;
    },

    // ustaw nową sumę transakcji o podanym typie i kategorii
    setSumaTransakcji(typp, katt) {
        let suma = 0;

        for (let transakcja of this.getTransakcjeByFiltry(typp, katt)) {
            if (transakcja.typ == typp) suma = suma + transakcja.wartosc;
        }

        if (typp === "przychód") {
            model.sumaPrzychodow = suma;
        } else if (typp === "wydatek") {
            model.sumaWydatkow = suma;
        }
    },

    // ustaw aktualny bilans
    setBilans() {
        return model.bilans = this.getSumaPrzychodow() - this.getSumaWydatkow();
    }
}

// inicjacja kontrolera
controller.init();
const model = {
    filtrTyp: "",
    filtrKategoria: "",
    sumaPrzychodow: 0,
    sumaWydatkow: 0,
    bilans: 0,

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

    init() {

        // DODAWANIE TRANSAKCJI

        this.data = document.getElementById("data");
        this.wartosc = document.getElementById("wartosc");
        this.dtyp = document.getElementById("dtyp");
        this.dkategoria = document.getElementById("dkat");
        this.dodajBTN = document.getElementById("dodajBTN");

        // po naciśnieciu guzika zapisanie wpisanych wartości do obiektu
        this.dodajBTN.addEventListener("click", () => controller.addTransakcja());


        // FILTROWANIE HISTORII TRANSAKCJI

        this.ftyp = document.getElementById("ftyp");
        this.fkategoria = document.getElementById("fkat");
        this.filtrujBTN = document.getElementById("filtrujBTN");

        // po naciśnięciu guzika aktualizacja wartości
        this.filtrujBTN.addEventListener("click", () => controller.setFiltry());

    },

    render() {
        const filtrTyp = controller.getFiltrTyp();
        const filtrKategoria = controller.getFiltrKategoria();
    }

}

const controller = {
    init() {
        view.init();
    },

    getFiltrTyp() {
        return model.filtrTyp;
    },

    getFiltrKategoria() {
        return model.filtrKategoria;
    },

    setFiltry() {
        model.filtrTyp = view.ftyp.value;
        model.filtrKategoria = view.fkategoria.value;
    },

    addTransakcja() {
        nowaTransakcja = {};

        nowaTransakcja.data = view.data.value;
        nowaTransakcja.wartosc = view.wartosc.value;
        nowaTransakcja.typ = view.dtyp.value;
        nowaTransakcja.kategoria = view.dkategoria.value;

        model.transakcje.push(nowaTransakcja);
    },

    getTransakcjeByFiltry(typp, katt) {
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

    getSumaPrzychodow() {
        return model.sumaPrzychodow;
    },

    setSumaTransakcji(typp, katt) {
        let suma = 0;

        for (transakcja of this.getTransakcjeByFiltry(typp, katt)) {
            if (transakcja.typ == typp) suma = suma + transakcja.wartosc;
        }

        if (typp === "przychód") {
            model.sumaPrzychodow = suma;
        } else if (typp === "wydatek") {
            model.sumaWydatkow = suma;
        }
    }

}

controller.init();
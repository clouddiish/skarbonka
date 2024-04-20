const model = {
    filtrujTyp: "",
    filtrujKategoria: "",

    transactions: [
        {
            id: 1,
            data: "2024-04-16",
            wartość: 20,
            typ: "wydatek",
            kategoria: "jedzenie"
        },
        {
            id: 2,
            data: "2024-04-16",
            wartość: 200,
            typ: "wydatek",
            kategoria: "lekarz"
        },
        {
            id: 3,
            data: "2024-04-16",
            wartość: 1000,
            typ: "przychód",
            kategoria: "Pensja"
        },
        {
            id: 4,
            data: "2024-04-16",
            wartość: 100000,
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
        this.nowaTransakcja = {};

        this.dodajBTN.addEventListener("click", () => {
            this.nowaTransakcja.data = this.data.value;
            this.nowaTransakcja.wartosc = this.wartosc.value;
            this.nowaTransakcja.typ = this.dtyp.value;
            this.nowaTransakcja.kategoria = this.dkategoria.value;
        });


        // FILTROWANIE HISTORII TRANSAKCJI

        this.ftyp = document.getElementById("ftyp");
        this.fkategoria = document.getElementById("fkat");
        this.filtrujBTN = document.getElementById("filtrujBTN");

        // po naciśnięciu guzika aktualizacja wartości
        this.filtrujBTN.addEventListener("click", () => controller.setFiltry());

    },

}

const controller = {
    init(){
        view.init();
    },

    setFiltry(){
        model.filtrujTyp = view.ftyp.value;
        model.filtrujKategoria = view.fkategoria.value;
    }

}

controller.init();
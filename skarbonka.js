const model = {
    filtrujTyp: "",
    filtrujKategoria: "",

    transakcje: [
        {
            data: "2024-04-16",
            wartość: 20,
            typ: "wydatek",
            kategoria: "jedzenie"
        },
        {
            data: "2024-04-16",
            wartość: 200,
            typ: "wydatek",
            kategoria: "lekarz"
        },
        {
            data: "2024-04-16",
            wartość: 1000,
            typ: "przychód",
            kategoria: "Pensja"
        },
        {
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
        this.dodajBTN.addEventListener("click", () => controller.addTransakcja());


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
    },

    addTransakcja(){
        nowaTransakcja = {};

        nowaTransakcja.data = view.data.value;
        nowaTransakcja.wartosc = view.wartosc.value;
        nowaTransakcja.typ = view.dtyp.value;
        nowaTransakcja.kategoria = view.dkategoria.value;

        model.transakcje.push(nowaTransakcja);
    }



}

controller.init();
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
		this.ftypValue = "";

		this.fkategoria = document.getElementById("fkat");
		this.fkategoriaValue = "";

		this.filtrujBTN = document.getElementById("filtrujBTN");

		// po naciśnięciu guzika aktualizacja wartości
		this.filtrujBTN.addEventListener("click", () => {
            this.ftypValue = this.ftyp.value;
			this.fkategoriaValue = this.fkategoria.value;
		});

	},

}

view.init();
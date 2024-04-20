const view = {

	init() {
		this.ftyp = document.getElementById("ftyp");
		this.ftypBTN = document.getElementById("ftypBTN");
		this.ftypValue = null;

		this.fkategoria = document.getElementById("fkat");
		this.fkategoriaBTN = document.getElementById("fkatBTN");
		this.fkategoriaValue = null;

		// po naciśnięciu guzików aktualizacja wartości
		this.ftypBTN.addEventListener("click", () => {
            this.ftypValue = this.ftyp.value;
		});

		this.fkategoriaBTN.addEventListener("click", () => {
            this.fkategoriaValue = this.fkategoria.value;
		});


	},

}

view.init();
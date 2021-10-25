let tableBody = document.getElementById("table-body");
let inputId = document.getElementById("numberId");
let buttonSearch = document.getElementById("busqueda");
let modal = document.getElementById("staticBackdrop");
let modalTitle = document.getElementById("modalTitle");
let modalBody = document.getElementById("modalBody");
let result = [];

fetch("./public/Tiempos.csv")
	.then((response) => response.text())
	.then((text) => tiempos(text));

inputId.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchNumberId(e.target.value);
	}
});
buttonSearch.addEventListener("click", () => {
	searchNumberId(inputId.value);
});

function tiempos(text) {
	let lines = text.split("\n");
	let headers = [
		"numero",
		"apellido",
		"nombre",
		"distancia",
		"posicion_general",
		"sexo_posicion",
		"tiempo",
		"categoría_posicion",
	];
	for (let i = 0; i < lines.length; i++) {
		let obj = {};
		let currentLine = lines[i].split(";");
		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentLine[j];
		}
		result.push(obj);
		let tr = document.createElement("tr");
		let th = document.createElement("th");
		th.scope = "row";
		th.innerHTML = result[i].posicion_general;
		let number = document.createElement("td");
		number.innerHTML = result[i].numero;
		let lastname = document.createElement("td");
		lastname.innerHTML = result[i].apellido;
		let name = document.createElement("td");
		name.innerHTML = result[i].nombre;
		let length = document.createElement("td");
		length.innerHTML = result[i].distancia;
		let sexPosition = document.createElement("td");
		sexPosition.innerHTML = result[i].sexo_posicion;
		let time = document.createElement("td");
		time.innerHTML = result[i].tiempo;
		let categoryPosition = document.createElement("td");
		categoryPosition.innerHTML = result[i].categoría_posicion;
		tr.appendChild(th);
		tr.appendChild(number);
		tr.appendChild(lastname);
		tr.appendChild(name);
		tr.appendChild(length);
		tr.appendChild(sexPosition);
		tr.appendChild(time);
		tr.appendChild(categoryPosition);
		tableBody.appendChild(tr);
	}
	return console.log(result);
}

function searchNumberId(number) {
	for (let i = 0; i < result.length; i++) {
		if (result[i].numero == number) {
			modalTitle.innerHTML = result[i].numero;
			let names = document.createElement("h5");
			names.innerHTML = `Nombre: ${result[i].nombre} ${result[i].apellido}`;
			modalBody.appendChild(names);
		}
	}
}

let tableBody = document.getElementById("table-body");
let inputId = document.getElementById("numberId");
let buttonSearch = document.getElementById("busqueda");
let modal = document.getElementById("staticBackdrop");
let modalTitle = document.getElementById("modalTitle");
let modalBody = document.getElementById("modalBody");
let result = [];
let nameModal = document.createElement("p");
nameModal.classList.add("text-uppercase", "text-start", "fs-5");
let positionModal = document.createElement("p");
positionModal.classList.add("text-uppercase", "text-start", "fs-5");
let distanceModal = document.createElement("p");
distanceModal.classList.add("text-uppercase", "text-start", "fs-5");
let timeModal = document.createElement("p");
timeModal.classList.add("text-uppercase", "text-start", "fs-5");
let categoryModal = document.createElement("p");
categoryModal.classList.add("text-uppercase", "text-start", "fs-5");
let generoModal = document.createElement("p");
generoModal.classList.add("text-uppercase", "text-start", "fs-5");
let verificationNumber;
let footLegendModal = document.createElement("p");
footLegendModal.classList.add("text-center");
footLegendModal.innerHTML = `<small>Posiciones sujetas a cambios </small>`;

fetch("./public/Tiempos.csv")
	.then((response) => response.text())
	.then((text) => tiempos(text));

fetch("./public/RaceData.json")
	.then((response) => response.json())
	.then((data) => raceInfo(data));

inputId.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		searchNumberId(inputId.value);
	}
});
buttonSearch.addEventListener("click", () => {
	searchNumberId(inputId.value);
});

function raceInfo(data) {
	console.log(data);
}

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
		let currentLine = lines[i].split(",");
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
	modalBody.innerHTML = "";
	modalTitle.innerHTML = "";
	nameModal.innerHTML = "";
	positionModal.innerHTML = "";
	distanceModal.innerHTML = "";
	timeModal.innerHTML = "";
	categoryModal.innerHTML = "";
	generoModal.innerHTML = "";
	verificationNumber = false;
	for (let i = 0; i < result.length; i++) {
		if (result[i].numero == number) {
			modalTitle.innerHTML = `<h2><span class="badge rounded-pill bg-primary">${result[i].numero}</span></h2>`;
			nameModal.innerHTML = `Nombre: <span class="fw-bold">${result[i].nombre} ${result[i].apellido}</span> `;
			positionModal.innerHTML = `Posición General: <span class="fw-bold">${result[i].posicion_general} </span>`;
			distanceModal.innerHTML = `Distancia: <span class="fw-bold">${result[i].distancia} </span>`;
			timeModal.innerHTML = `Tiempo: <span class="fw-bold">${result[i].tiempo} </span>`;
			categoryModal.innerHTML = `Categoría / Posición: <span class="fw-bold">${result[i].categoría_posicion} </span>`;
			generoModal.innerHTML = `Género / Posición: <span class="fw-bold">${result[i].sexo_posicion} </span>`;
			modalBody.appendChild(nameModal);
			modalBody.appendChild(distanceModal);
			modalBody.appendChild(timeModal);
			modalBody.appendChild(positionModal);
			modalBody.appendChild(categoryModal);
			modalBody.appendChild(generoModal);
			modalBody.appendChild(footLegendModal);
			verificationNumber = true;
		}
	}
	if (verificationNumber == false) {
		modalTitle.innerHTML = `<span class="badge rounded-pill bg-danger">${number}</span>`;
		modalBody.innerHTML = `CORREDOR INEXISTENTE`;
	}
}

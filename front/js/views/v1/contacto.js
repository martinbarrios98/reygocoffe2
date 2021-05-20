import { alertaNotificacion } from '../../emergentes/emergentes.js';

export async function insertarMapa (){

    console.log('me ejecuto');

    const miMapa = L.map('mapaid').setView([17.5480249,-92.9529461], 20.75);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFydGluYmFycmlvczk4IiwiYSI6ImNrbzJrNzJmYTA3NDEybm83eDlyMHF3YmIifQ.VLIrUmBU6cNCq53clrsDhw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFydGluYmFycmlvczk4IiwiYSI6ImNrbzJrNzJmYTA3NDEybm83eDlyMHF3YmIifQ.VLIrUmBU6cNCq53clrsDhw'
    }).addTo(miMapa);

    const marca = L.marker([17.5480249, -92.9529461]).addTo(miMapa);
    const circle = L.circle([17.5480249, -92.9529461], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 40
    }).addTo(miMapa);

    marca.bindPopup("<b>ReygoCoffe!!</b><br>Doctor Ramon Medina, Colonia Centro, Teapa, Tabasco.").openPopup();

}
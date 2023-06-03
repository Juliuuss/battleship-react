
const creadorCoordenada = () => {
    const posicionY = Math.floor(Math.random() * 9);
    const posicionX = Math.floor(Math.random() * 9);
    const coordenadas = [posicionX, posicionY];
    return coordenadas
}
export default creadorCoordenada;
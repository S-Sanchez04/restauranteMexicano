


document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:8000/api/orders')
    .then(response => response.json())
    .then(data => {
      const cedulaDiv = document.getElementById('cedula');
      const estadosDiv = document.getElementById('estados');

      data.forEach(order => {
        const cedulaSpan = document.createElement('span');
        cedulaSpan.textContent = order.id;
        cedulaDiv.appendChild(cedulaSpan);

        const estadoSpan = document.createElement('span');
        estadoSpan.textContent = order.estado;
        estadoSpan.classList.add('sushi');
        estadoSpan.classList.add(order.estado === 'proceso' ? 'proceso' : 'entregado');
        estadoSpan.addEventListener('click', () => cambiarEstado(estadoSpan));
        estadosDiv.appendChild(estadoSpan);
      });
    })
    .catch(error => {
      console.error('Hubo un problema al obtener los datos:', error);
    });
});

function cambiarEstado(span) {
  span.classList.toggle('proceso');
  span.classList.toggle('entregado');
  // Aquí puedes agregar la lógica para actualizar el estado en la API si es necesario
  // Por ejemplo, podrías enviar una solicitud PATCH/PUT a la API para cambiar el estado
  // Puedes usar fetch o una librería como Axios para realizar la solicitud
}

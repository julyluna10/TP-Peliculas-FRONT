//Vamos a hacer una funcion que me cargue la tabla con todas las peliculas

document.addEventListener('DOMContentLoaded',function()
{
	 const form=document.getElementById('itemForm');
	 const itemsTableBody=document.getElementById('itemsTableBody');
	 
	 form.addEventListener('submit', function(event)
	 {
		event.preventDefault();
		
		const formData+new FormData(form);
		const itemId= formData.get('id');
		
		const data={
			id: formData.get('id'),
			titulo: formData.get('titulo'),
		    genero: formData.get('genero'),
			duracion: formData.get('duracion'),
			director: formData.get('director'),
			reparto: formData.get('reparto'),
			sinopsis: formData.get('sinopsis')
		};
		
		if (itemId) //Es para saber si hay un dato ahi y devuelve true o false. Es decir, que existe el ID
		{
			//funcion para modificar
		}
		else
		{
			//funcion para crear 
			createItem(data);
		}
	 });
	 
	 
	 function createItem(data){
		  fetch('http://localhost:8080/PruebaJava/peliculas',
		  {
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
			},
			
			body: JSON.stringify(data)
		  })
		  
		  .then(result=>{
			console.log("Exito!!", result);
			loadItems();
			form.reset();
		  })
		  
		  .catch(error=>
		  {
		  console.error("Hubo algun error", error);
		  alert("Hubo un error al ingresar la pelicula");
		  }
		  
          );
		  
		
	 }
	 
	 
	 
	 
	 
	 
	 // Función para cargar los elementos desde la API
function loadItems() {
    fetch('http://localhost:8080/PruebaJava/peliculas')
    .then(response => response.json())
    .then(data => {
        itemsTableBody.innerHTML = '';
        if (data)
            //if (data.peliculas)
            {
			data.forEach(pelicula => {
            //data.peliculas.forEach(pelicula => {
                const row = document.createElement('tr'); //creamos una table row
                row.innerHTML = `
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>                   
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.duracion}</td>
                    <td>${pelicula.director}</td>
                    <td>${pelicula.reparto}</td>
                    <td>${pelicula.sinopsis}</td>                    
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${pelicula.id})" >Eliminar</button>
                    </td>
                    <td>
                        <button class="btn btn-success" onclick="editItem(
						   ${pelicula.id},
                   		   '${pelicula.titulo}',                   
                           '${pelicula.genero}',
                           '${pelicula.duracion}',
                           '${pelicula.director}',
                           '${pelicula.reparto}',
                           '${pelicula.sinopsis}')" >Editar</button>
                    </td>
                `;
                itemsTableBody.appendChild(row);
            });
        } 
        else 
        {
            console.error('No se encontraron películas');
        }
    })
    .catch(error => console.error('Error:', error));
}
   
	 
window.editItem=function(id,titulo,genero,duracion,director,reparto,sinopsis)
{
	document.getElementById('id').value=id;
	document.getElementById('titulo').value=titulo;
	document.getElementById('genero').value=genero;
	document.getElementById('duracion').value=duracion;
	document.getElementById('director').value=director;
	document.getElementById('reparto').value=reparto;
	document.getElementById('sinopsis').value=sinopsis;	
}	


	//funcion para eliminar una pelicula

 function deleteItem(id)
 {
	fetch(`http://localhost:8080/PruebaJava/peliculas/${id}`,
	{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	loadItems(); //Es para luego de eliminar, recargar la pagina. 
 }
 
 window.deleteItem=deleteItem;
	 

loadItems();	
});
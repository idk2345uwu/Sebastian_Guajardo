import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesas.js";

addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    cargarDatos();
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
})

document.getElementById('modo_oscuro').addEventListener('click', function() {
    
    document.body.classList.toggle('fondo_oscuro');
    //remplaza las clases, en este caso son dos clases para el fondo, el toggle lo que hace es que cambia la clase que ya esta
    //por la clase fondo oscuro



});


document.getElementById('fuente_grande').addEventListener('click', function() {
    
    
    document.body.classList.toggle('parrafos_grande');


    //lo mismo de arriba, pero con un parrafo
});



const registrar = ()=>{
    validarVacio("nombre");
    validarVacio("apellido");
    validarVacio("edad");
    validarVacio("rut");
    validarVacio("correo");
    //se aplican funciones de validar que no esten vacios los campos, al final del codigo estan las funciones validacion
    //Recupera elementos
    let eNombre = document.getElementById("nombre");
    let vNombre = eNombre.value
    let eApellido = document.getElementById("apellido");
    let vApellido = eApellido.value
    let eEdad = document.getElementById("edad");
    let vEdad = eEdad.value
    let eRut = document.getElementById("rut");
    let vRut = eRut.value
    let eCorreo = document.getElementById("correo");
    let vCorreo = eCorreo.value
    let eFecha = document.getElementById("fechanacimiento");
    let vFecha = eFecha.value
    let eParticular = document.getElementById("particular");
    let vParticular = eParticular.value
    let eEvento = document.getElementById("evento");
    let vEvento = eEvento.value


    if (vNombre.trim() === "") {
    
     return; 

    }


    if (vApellido.trim() === "") {
    
     return; 

    }

    
    if (vEdad.trim() === "") {
    
        return; 
   
    }

    
    if (vRut.trim() === "") {
    
        return; 
   
    }

    
    if (vCorreo.trim() === "") {
    
        return; 
   
    }

    //en los if superiores se valida que no esten vacias las funciones, si estan vacias, se corta ahi en los return


    //en caso de que no se haya parado en los return, se registrar el objeto
    let objeto = {nombre:vNombre,apellido:vApellido,edad:vEdad,rut:vRut,correo:vCorreo,fechanacimiento:vFecha,particular:vParticular,evento:vEvento};

    // console.log(objeto);

    registrarPersona(objeto).then(()=>{
        alert("Se registra con exito")
        cargarDatos();
    }).catch((error)=>{
        //console.log(error);
        console.log(doc.data());
    });
}

const cargarDatos = ()=>{
    //Traer de las promesas todo lo registrado
    obtenerPersonas().then((personas)=>{
        console.log("HOLA")
        console.log(personas)
        //Cargarlo en la tabla del html
        let estructura = ""
        personas.forEach((p)=>{
            estructura += "<tr>"
            estructura += "<td>"+p.nombre+"</td>"
            estructura += "<td>"+p.apellido+"</td>"
            estructura += "<td>"+p.rut+"</td>"
            estructura += "<td>"+p.correo+"</td>"
            estructura += "<td>"+p.edad+"</td>"
            estructura += "<td>"+p.fechanacimiento+"</td>"
            estructura += "<td>"+p.particular+"</td>"
            estructura += "<td>"+p.evento+"</td>"
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>";
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>";
            estructura += "</tr>";
        })
        document.getElementById("cuerpoTabla").innerHTML = estructura;
        
        personas.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDfechanacimiento").value = p.fechanacimiento;
                document.getElementById("UPDparticular").value = p.particular;
                document.getElementById("UPDevento").value = p.evento;
                document.getElementById("btnActualizar").value = p.id;
                //el boton tendra el id del objeto
            });
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar a: \n"+p.nombre+" "+p.apellido)){
                    console.log("Vamos a eliminar")
                    eliminarPersona(p.id).then(()=>{
                        alert("Eliminaste con éxito")
                        cargarDatos();
                    }).catch((e)=>{
                        console.log(e)
                    })

                }else{
                    console.log("Cancelaste la eliminación")
                }
            })
        })
    })
//cualquier cosa que este aquí se ejecuta antes de que cargue la página, porque no esta ligado a load
}

const actualizar = ()=>{
    //Recupero elemento
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eEdad = document.getElementById("UPDedad");
    let eRut = document.getElementById("UPDrut");
    let eCorreo = document.getElementById("UPDcorreo");
    let eFecha = document.getElementById("UPDfechanacimiento");
    let eParticular = document.getElementById("UPDparticular");
    let eEvento = document.getElementById("evento");
    let vNombre = eNombre.value
    let vApellido = eApellido.value
    let vEdad = eEdad.value
    let vRut = eRut.value
    let vCorreo = eCorreo.value
    let vFecha = eFecha.value
    let vParticular = eParticular.value
    let vEvento = eEvento.value
    let objeto = {nombre:vNombre,apellido:vApellido,edad:vEdad,rut:vRut,correo:vCorreo,fechanacimiento:vFecha,particular:vParticular,evento:vEvento};

    let id = document.getElementById("btnActualizar").value;
    //Envío el objeto y el id a las promesas

    //Cargar algo tipo loading...(para evitar que se aprete el boton muchas veces)
    document.getElementById("btnActualizar").disabled = "True";
    actualizarPersona(objeto,id).then(()=>{
        alert("Se actualiza con éxito")
        cargarDatos();
        document.getElementById("btnActualizar").disabled = "False";
    }).catch((e)=>{
        console.log(e)
        //catch para que en caso de algo falle, se recoga el error y lo especifique.
    }).finally(()=>{
        document.getElementById("btnActualizar").disabled = "";
        //finally para que se active el boton aunque falle la promesa
    })
}





//en esta funcion se llaman a las funciones validar vacio para cada uno de los campos a su derecha, "id"
function validar(){
    validarVacio("nombre");
    validarVacio("apellido");
    validarVacio("edad");
    validarVacio("rut");
    validarVacio("correo");

}


function validarVacio(idCampo){
    //REcupera el elemento
    let elemento = document.getElementById(idCampo); //recupera el elemento
    console.log(elemento);
    //Recuperar valor del campo
    let valor = elemento.value; //recupera el valor del campo
    console.log(valor);
    let eParrafo = document.getElementById("p"+idCampo); //recupera el parafo que esta en no display
    if(valor.trim()==""){ //si el campo esta vacio aca, muestra abajo el parrafo que estaba con el no display y un borde rojo usando el display block de estilo
        console.log("No hay nada")
        elemento.style.borderColor = "red";
        eParrafo.style.display = "block";
    }else{ //si el campo esta con contenido, no se muestra la advertencia, cambia a un borde verde y el display block no es necesario, por ende, none
        console.log("algo Hay")
        elemento.style.borderColor = "green";
        eParrafo.style.display = "none";
    }
}
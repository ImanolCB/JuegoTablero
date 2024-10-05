"use strict";

/**
 * * Idea de funcionamiento del proyecto:
 * -------------------------------------------------------------------------------------------------------------------------------------
 * * - El index contiene las secciones sobre las que se van a aplicar las modificaciones de js
 * 
 * * - En la parte superior del código están todas las variables que se emplean de forma global
 * 
 * * - Para la opción de creación del juego se debe cumplir la validación de nombre gestionado en una función al final del código
 * 
 * * - La creación del tablero no contiene listeners, los listeners se aplican tras tirar el dado,
 * *  solo a las casillas en las que se calcula que se puede desplazar el jugador.
 * 
 * * - Tras la selección de la casilla se vuelve a crear el tablero con los nuevos valores de posición y puntos actualizados
 * 
 * * - Las puntuaciones se almacenan junto con el nombre del jugador en .localstorage y cada vez que se actualiza o 
 * * se actualiza la puntuación se muestran los datos al jugador ordenados.
 */



/**
*  ----------------------------------------------------------------------
* *Funcion que carga todos los datos antes de desplegarse en la web
* ----------------------------------------------------------------------
*/

function inicio() {
  //Obtencion de elementos y declaración de variables
  let lateral = 9;
  let contador = 0;
  let posicionActual = 0;
  let valorDado = 0;
  const miStorage = window.localStorage;

  let nombre = document.getElementById("nombre");
  let imagenDado = document.getElementById("dado");
  let botonCrearTabla = document.getElementsByTagName("button")[0];
  let botonJugar = document.getElementById("jugar");
  let botonReiniciar = document.getElementById("reiniciar");
  let arrayCeldas = document.getElementsByTagName("td");
  let puntos = document.getElementById("puntuacion");

  let arbol1 = Math.floor(Math.random() * (98 - 1) + 1);
  let arbol2 = Math.floor(Math.random() * (98 - 1) + 1);
  let arbol3 = Math.floor(Math.random() * (98 - 1) + 1);
  let arbol4 = Math.floor(Math.random() * (98 - 1) + 1);
  let arbol5 = Math.floor(Math.random() * (98 - 1) + 1);
  let arbol6 = Math.floor(Math.random() * (98 - 1) + 1);

  //Se deshabilitan los botones de juego
  botonJugar.style.display = "none";
  botonReiniciar.style.display = "none";
  imagenDado.style.display = "none";


    botonCrearTabla.addEventListener("click", (ev) => {

      //Constante comprobación del estado de validación de datos introducido por el usuario
      while(1){
        if (validacionUsuario(nombre) == false) {
          break;
        }

      else{
        //Construccion de la tabala y se habilita el boton para comenzar a jugar"
        construirTabla();
        nombreUsuario(nombre);

        botonReiniciar.addEventListener("click", () => {
          contador = 0;
          posicionActual = 0;
          imagenDado.disabled = false;
          
          construirTabla();
          pintarCeldas();
        })
        break;
      }
    }
  });
  
  
  
  /**
   * ----------------------------------------------------------------------
   * *Funcion de construccion de la tableLayout
   * ----------------------------------------------------------------------
  */
  function construirTabla() {
    nombre.style.display = 'none';
    //Apertura de la tabla
    let datos = "<table>";
    //h = horizontal y v=vertical
    for (let v = 0; v <= lateral; v++) {
      // Creación de fila
      datos += `<tr id=" f${v}">`;
      for (let h = 0; h <= lateral; h++) {
        //Creacion de celda
        if(v == 0){
          datos += `<td id="${h}"></td>`;
        }
        else{
          datos += `<td id="${v}${h}"></td>`;
        }
      }
      //Cierre de fila
      datos += `</tr>`;
    }
    //Cierre de tabla
    datos += "</table>";
    
    //Deshabilida la opción de pulsar el botón de crear tabla y habilita los de juego
    botonCrearTabla.style.display = "none";
    botonJugar.style.display = "block";
    botonReiniciar.style.display = "block";
    
    
    
    //Se carga la tabla con la estructura del tablero
    document.getElementById("tabla").innerHTML = datos;
    tablaDePuntuaciones(0);
    puntos.textContent = `Puntuacion actual: ${contador}`;
    
    
    //Al construir la tabla se habilita el boton de juego y se habilitan los listener de cada casilla
    botonJugar.addEventListener("click", (ev) => {
      //Muestro la imagen del dado deshabilitada
      imagenDado.style.display = "block";
      
      imagenDado.addEventListener("click", (ev) => {
        tirarDado();
          });
          pintarCeldas();
        });
  }




  /**
   * ----------------------------------------------------------------------
   * *Función que pinta cada elemento de una tabla
   * ----------------------------------------------------------------------
   */
  function pintarCeldas() {
    //Recorre todos los elementos del array que contiene las celdas almacenadas y asigna un atributo ID a cada celda
    for (let i = 0; i < arrayCeldas.length; i++) {
      arrayCeldas[i].setAttribute("id", i);
      
      arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/2172/PNG/512/spring_bush_tree_leaves_grass_nature_flower_icon_133296.png")`;
      arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
      arrayCeldas[i].style.backgroundSize = `cover`;
      arrayCeldas[i].style.filter = `drop-shadow(0 0 3px rgba(6, 15, 0, 0.484))`;

      if (i == arbol1 || i == arbol2 || i == arbol3 || i == arbol4 || i == arbol5 ||i == arbol6 ) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/3122/PNG/512/forest_tree_nature_garden_wood_spring_icon_191925.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
      }

      // Comprobación de la casilla inicial y final
      if (i === 99) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/418/PNG/128/bone_41561.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
        arrayCeldas[i].style.filter = `drop-shadow(0 0 5px rgb(255, 255, 0))`;
      }
      if (i === 0) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-dog-4591896_122115.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
      }
    }
    //Deshabilita el click del boton jugar y habilita el de reiniciar
    botonJugar.disabled = true;
    botonReiniciar.disabled = false;
  }



  /**
   * ----------------------------------------------------------------------
   * *Función que recorre todo el array de celdas restableciendo su color inicial y
   * *modifica el color de la celda seleccionada en el momento del click
   * ----------------------------------------------------------------------
   */
  function tratarCelda(e, nuevaPosicion) {
    construirTabla();

    /**
     * * Comprueba si las celdas por las que pasa corresponden a la posicion de un arbol,
     * * a la posicion del hueso o la posicion del perro, el resto las pinta con arbustos.
     */
    
    for (let i = 0; i < arrayCeldas.length; i++) {

        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/2172/PNG/512/spring_bush_tree_leaves_grass_nature_flower_icon_133296.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
        arrayCeldas[i].style.filter = `drop-shadow(0 0 3px rgba(6, 15, 0, 0.484))`;

        if (i == arbol1 || i == arbol2 || i == arbol3 || i == arbol4 || i == arbol5 ||i == arbol6 ) {
          arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/3122/PNG/512/forest_tree_nature_garden_wood_spring_icon_191925.png")`;
          arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
          arrayCeldas[i].style.backgroundSize = `cover`;
        }
      
      if (i === 99) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/418/PNG/128/bone_41561.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
        arrayCeldas[i].style.filter = `drop-shadow(0 0 5px rgb(255, 255, 0))`;
      }
      if (i === nuevaPosicion) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-dog-4591896_122115.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
      }
    }

    /**
     * * Establece la posicion actual con la posicion seleccionada por el jugador
     * * y habilita la opcion de tirar el dado otra vez
     */
    posicionActual = nuevaPosicion;
    imagenDado.disabled = false;

    if(nuevaPosicion === 99){
      for (let i = 0; i < arrayCeldas.length; i++) {
        arrayCeldas[i].style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/418/PNG/128/bone_41561.png")`;
        arrayCeldas[i].style.backgroundRepeat = `no-repeat`;
        arrayCeldas[i].style.backgroundSize = `cover`;
        arrayCeldas[i].style.filter = `drop-shadow(0 0 5px rgb(255, 255, 0))`;
        arrayCeldas[i].style.animation = 'latido 1s all';
      }

      /**
       * * La tabla de puntuaciones se modifica añadiendo el valor de tiradas actual ordenado de menor a mayor numero de tiradas.
       * * Una vez llegado al final de la partida se deshabilita la opcion de tirar dado hasta que no se reinicie el juego nuevamente.
       */
      tablaDePuntuaciones(contador);
      imagenDado.disabled = true;

    }
  }




  /**
   * ----------------------------------------------------------------------
   * *Función de obtener numero aleatorio entre 1-6 para el dado
   * ----------------------------------------------------------------------
   */
  function tirarDado() {
    /**
     * * Se obtiene un valor aleatorio entre 1 - 6 y aumenta el valor de contador para la puntuacion.
     * * Y después se escribe el valor de los puntos que lleva en la partida el jugador.
     */
    valorDado = Math.floor(Math.random() * (7 - 1) + 1);
    contador++;
    puntos.textContent = `Puntuacion actual: ${contador}`;

    imagenDado.style.backgroundImage = `url("https://cdn.icon-icons.com/icons2/2645/PNG/512/dice_icon_16019${10-valorDado}.png")`;
    imagenDado.style.backgroundRepeat = `no-repeat`;
    imagenDado.style.backgroundSize = `cover`;

    /**
     * * Calculo de las posiciones de desplazamiento del jugador en la tabla
     */
    desplazarse(valorDado);
  }



  /**
   * ----------------------------------------------------------------------
   * *Funcion que muestra las posibles opciones de desplazamiento al tirar el dado
   * ----------------------------------------------------------------------
   */

  function desplazarse(numero) {
    //Padstart define el tamaño del string y rellena al principio los huecos con el valor definido
    let posicionDosCifras = posicionActual.toString().padStart(2, "0");
    let arrayPosicionActual = posicionDosCifras.split("");
    //Obtencion de las cifras divididas
    let horizontal = arrayPosicionActual[0];
    let vertical = arrayPosicionActual[1];
    //Calculo de casillas de desplazamiento Derecha y Abajo
    let desplazarHorizontal = parseInt(posicionDosCifras) + numero;
    let desplazarVertical = parseInt(posicionDosCifras) + numero * 10;
    //Obtencion de la celda con la ID correspondiente
    let opcion1 = document.getElementById(`${desplazarHorizontal}`);
    let opcion2 = document.getElementById(`${desplazarVertical}`);
    imagenDado.disabled = true;

    /**
     * ----------------------------------------------------------------------
     * *Seccion de comprobacion de desplazamiento positivo
     * ----------------------------------------------------------------------
     */

    if (horizontal >= 0 && horizontal <= 9 && numero + parseInt(vertical) < 10 ) {
      opcion1.style.backgroundColor = "darkslategray";

      //Añade un Listener a cada celda independiente de la tabla
      arrayCeldas[desplazarHorizontal].addEventListener("click", (e) => {
        tratarCelda(arrayCeldas[desplazarHorizontal], desplazarHorizontal);
      });
    }


    if (vertical >= 0 && vertical <= 9 && numero + parseInt(horizontal) < 10) {
      opcion2.style.backgroundColor = "darkslategray";

      //Añade un Listener a cada celda independiente de la tabla
      arrayCeldas[desplazarVertical].addEventListener("click", (e) => {
        tratarCelda(arrayCeldas[desplazarVertical], desplazarVertical);
      });
    }

    /**
     * ----------------------------------------------------------------------
     * *Seccion de comprobacion de desplazamiento negativo
     * ----------------------------------------------------------------------
     */
    //Calculo de las celdas de Arriba e Izquierda 
    let desplazarHorizontalNegativo = parseInt(posicionDosCifras) - (numero);
    let desplazarVerticalNegativo = parseInt(posicionDosCifras) - (numero * 10);
    // Obtencion de las celdas correspondientes a las ID calculadas
    let opcion3 = document.getElementById(`${desplazarHorizontalNegativo}`);
    let opcion4 = document.getElementById(`${desplazarVerticalNegativo}`);



    if (horizontal >= 0 && horizontal <= 9 && parseInt(vertical) - numero >= 0) {
      opcion3.style.backgroundColor = "darkslategray";

      //Añade un Listener a cada celda independiente de la tabla
      arrayCeldas[desplazarHorizontalNegativo].addEventListener("click",(e) => {
          tratarCelda(arrayCeldas[desplazarHorizontalNegativo],desplazarHorizontalNegativo);
        }
      );
    }


    if (vertical >= 0 && vertical <= 9 && parseInt(horizontal) - numero >= 0) {
      opcion4.style.backgroundColor = "darkslategray";

      //Añade un Listener a cada celda independiente de la tabla
      arrayCeldas[desplazarVerticalNegativo].addEventListener("click", (e) => {
        tratarCelda(arrayCeldas[desplazarVerticalNegativo],desplazarVerticalNegativo);
      });
    }

    /**
     * * Gestion para evitar que el juego se acabe cuando el usuario caiga en las celdas centrales de la tabla y le toque un 6 
     */
    if ((posicionDosCifras == 44 && numero == 6) || (posicionDosCifras == 45 && numero == 6) || (posicionDosCifras == 54 && numero == 6) || (posicionDosCifras == 55 && numero == 6)) {
      tirarDado();
    }
  }



  /**
   * ----------------------------------------------------------------------
   * * Funcion que añade el numero de tiradas del contador a la tabla de puntuaciones
   * ----------------------------------------------------------------------
   * 
   */

  function tablaDePuntuaciones(resultado) {
    let output = "";
    let arrayPuntuaciones = [];

    // Obtener las puntuaciones almacenadas en localStorage
    if (miStorage.getItem("almacen") != null) {
        arrayPuntuaciones = JSON.parse(miStorage.getItem("almacen"));
        arrayPuntuaciones.sort((a, b) => a.puntos - b.puntos);
    }

    // Si hay un resultado válido, agregarlo a las puntuaciones
    if (resultado > 0) {
        arrayPuntuaciones.push({ user: nombre.value, puntos: resultado });
        arrayPuntuaciones.sort((a, b) => a.puntos - b.puntos);

        // Determinar si es un nuevo récord
        if (arrayPuntuaciones.length === 1 || resultado < arrayPuntuaciones[0].puntos) {
            alert("NUEVO RECORD!! 🥳");
        } else {
            alert("HAS GANADO 🥳");
        }
    }

    // Guardar las puntuaciones actualizadas en localStorage
    miStorage.setItem("almacen", JSON.stringify(arrayPuntuaciones));
    console.log(arrayPuntuaciones);

    // Construir la salida HTML de las puntuaciones
    for (let i = 0; i < arrayPuntuaciones.length; i++) {
        output += `Puntos de ${arrayPuntuaciones[i].user} : ${arrayPuntuaciones[i].puntos}<br>`;
    }

    // Mostrar las puntuaciones en el elemento con id "resultados"
    document.getElementById("resultados").innerHTML = output;
}




  /**
   * ----------------------------------------------------------------------
   * * Función que valida que los datos del nombre de usuario son correctos
   * ----------------------------------------------------------------------
   *  
   */
  function validacionUsuario(nombre){
    let validado = false;
    var tamanoNombre;
    var numerosNombre;

    if ((nombre.value).length >= 4) {
      validado = true;
      if (/[0-9]/.test(nombre.value)) {
        validado = false;
        numerosNombre = false;
      }
      else{
        numerosNombre = true;
      }
      tamanoNombre = true;
    }
    else{
      tamanoNombre = false;
    }

    if(tamanoNombre == false){
      alert("Formato de nombre erroneo:\n - Debe tener al menos 4 letras.");
    }
    if(numerosNombre == false){
      alert("Formato de nombre erroneo:\n - No puede contener numeros");
    }

    return validado;
  }
}




/**
 * ----------------------------------------------------------------------
 * *Pinta el nombre del usuario en el centro de la pantalla
 * ----------------------------------------------------------------------
 */

function nombreUsuario(nombre){
  document.getElementById("usuario").textContent = `Hola ${nombre.value}, a jugar!`;
}



/**
 * ----------------------------------------------------------------------
 * *Muestra los elementos del archivo despues de cargar el script
 * ----------------------------------------------------------------------
 */
window.onload = inicio;

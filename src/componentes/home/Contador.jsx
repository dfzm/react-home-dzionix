import React, { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);
  const [texto, setTexto] = useState("");
  const manejarCambio = (e) => {
    setTexto(e.target.value);
  };
  return (
    <>
      <p> Contar: {contador} </p>
      <button onClick={() => setContador(contador + 1)}> SUMAR</button>
      <button onClick={() => setContador(contador - 1)}> RESTAR</button>
      <button onClick={() => setContador(0)}> REINICIAR</button>
      <hr />
      <input
        value={texto}
        type="text"
        onChange={manejarCambio}
        placeholder="Escribe algo"
      />

      <p> Has escrito: {texto}</p>
    </>
  );
};

export default Contador;

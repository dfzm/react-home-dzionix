import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({ nombre: "", apellido: "" });
  const manejoCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <input
        type="text"
        value={formData.nombre}
        name="nombre"
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={formData.apellido}
        name="apellido"
        placeholder="Apellido"
      />
      <p> Nombre completo: {} </p>
    </>
  );
};

export default Formulario;

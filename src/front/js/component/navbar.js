const apiUrl = process.env.BACKEND_URL + "/api";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logoMTM.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("User ID:", store.user_id);
    const conversation = await actions.startConversation(store.user_id);
    if (conversation) {
      navigate(`/demo`);
    }
  };

  const handle = async () => {
    console.log("psyco ID:", store.psyco_id);
    localStorage.setItem("idPsyco", store.psyco_id);
    localStorage.setItem("booleano", store.psycologoLogeado);

    navigate(`/changePsico/${store.psyco_id}`);
  };

  async function submitform(e) {
    e.preventDefault();

    console.log("Intentando cerrar sesión...");

    let success = await actions.logout();

    console.log("Resultado de logout:", success);
    if (success) {
      console.log("Cierre de sesión exitoso, navegando a home...");
      navigate("/");
      console.error("Error durante el logout, no se pudo navegar.");
    }

  
  }

  

  useEffect(() => {
    const idPsyco = localStorage.getItem("psyco_id");
    if (idPsyco) {
      actions.getPsychologistById(idPsyco);
    }
  }, []);

  return (
    <nav className="navbar ">
      <div className="container ">
        <a href="/">
          <span className="navbar-brand mb-0 h1">
            <img className="logo" src={logo} alt="Logo" />
          </span>
        </a>

        {store.token == null ? (
          <div className="ml-auto d-flex">
            <a href="/login">
              <button className="btn btn-outline-primary">Iniciar sesión</button>
            </a>

            <div className="dropdown ms-3">
              <a
                className="btn btn-outline-primary dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Registrarse
              </a>

              <ul className="dropdown-menu ">
                <li>
                  <a className="dropdown-item btn btn-outline-primary" href="/usuario">
                    Usuario
                  </a>
                </li>
                <li>
                  <a className="dropdown-item btn btn-outline-primary" href="/psicho">
                    Psicólogo
                  </a>
                </li>
              </ul>
            </div>

            <button
              className="btn btn-outline-primary ms-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Hablar con nuestro chat
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 branco"
                      id="exampleModalLabel"
                    >
                      ¡ATENCION!
                    </h1>
                  </div>
                  <div className="modal-body">
                    <h6 className="branco">
                      Para acceder a nuestro chat de asistencia con IA, es
                      necesario registrarse como usuario. ¡Regístrate ahora para
                      obtener una experiencia personalizada y un soporte más
                      rápido!
                    </h6>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-3"
                      data-bs-dismiss="modal"
                    >
                      ¡OK! VOY REGISTRARME
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {store.psycologoLogeado == false ? (
              <div className="ml-auto">
                <button onClick={submitform} className="btn btn-primary">
                  Cerrar sesión
                </button>
                <button onClick={handleClick} className="btn btn-primary ms-2">
                  Habla con nuestro chat
                </button>
                {console.log(store.psycologoLogeado)}
              </div>
            ) : (
              <div className="ml-auto">
                {console.log(store.psycologoLogeado)}
                <button onClick={submitform} className="btn btn-primary">
                Cerrar sesión
                </button>
                <button onClick={handle} className="btn btn-primary ms-2">
                  Ve a tu perfil
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

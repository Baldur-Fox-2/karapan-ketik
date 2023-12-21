import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img
            onClick={() => navigate("/")}
            type="button"
            src="https://i.ibb.co/FXHCHjT/game-ketik-crop.png"
            style={{ height: "35px" }}
          />

          <h2
            className="navbar-brand"
            type="button"
            onClick={() => navigate("/")}
          >
            Karapan Ketik
          </h2>

          <h2
          className="navbar-brand"
           
            type="button"
            onClick={() => navigate("/about")}
          >
            About
          </h2>
        </div>
      </nav>
    </>
  );
}

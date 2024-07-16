import { Link } from "react-router-dom";
import LogoImg from "./Logo.png";

export default function Logo() {
  return (
    <Link
      className="logo"
      style={{
        height: "35px",
        background: "#bdb4a3",
        borderRadius: "8px",
        padding: "0 10px",
      }}
      to="/"
    >
      ambientivo
    </Link>
  );
}

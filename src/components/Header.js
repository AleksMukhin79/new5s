import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="d-flex justify-between p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
          <div className="headerInfo">
            <h3 className="text-uppercase">Система 5С на производстве</h3>
            <p className="opacity-5">поиск выявленных нарушений</p>
          </div>
        </div>
      </Link>
    </header>
  );
}

export default Header;

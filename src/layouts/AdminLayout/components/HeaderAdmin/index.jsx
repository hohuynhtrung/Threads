import Icons from "@/assets/icons";
import { Link } from "react-router";

function HeaderAdmin() {
  return (
    <header className="relative z-20 w-full flex items-center justify-between px-4 py-3 sm:hidden">
      <Link to="/" className="p-1 cursor-pointer">
        <img
          src={Icons.iconBack}
          alt="Back"
          className="w-6 h-6 object-contain"
        />
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src={Icons.iconThread}
          alt="Threads"
          className="h-8 object-contain"
        />
      </div>

      <div className="w-6" />
    </header>
  );
}

export default HeaderAdmin;

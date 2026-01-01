import { Link } from "react-router-dom";
import { Cat } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
          <Cat className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-xl font-bold text-foreground">
        Story<span className="text-gradient-gold">Cat</span>
      </span>
    </Link>
  );
};

export default Logo;

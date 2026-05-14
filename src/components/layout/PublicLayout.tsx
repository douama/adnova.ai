import { Outlet } from "react-router-dom";
import { Nav } from "../marketing/Nav";
import { Footer } from "../marketing/Footer";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

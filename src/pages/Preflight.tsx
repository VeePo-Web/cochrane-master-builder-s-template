import { useEffect } from "react";
import PreflightDashboard from "@/components/knowledge/PreflightDashboard";

const Preflight = () => {
  useEffect(() => {
    document.title = "Guard-Rail Preflight — Knowledge";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <PreflightDashboard />
    </main>
  );
};

export default Preflight;

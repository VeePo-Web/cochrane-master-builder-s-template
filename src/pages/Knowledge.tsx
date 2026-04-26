import { useEffect } from "react";
import DecisionSearch from "@/components/knowledge/DecisionSearch";

const Knowledge = () => {
  useEffect(() => {
    document.title = "Decision Index — Knowledge";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Internal decision index for partner-doc rule books.",
      );
    }
    // Discourage indexing of this internal route.
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
      <DecisionSearch />
    </main>
  );
};

export default Knowledge;

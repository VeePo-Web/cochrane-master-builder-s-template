import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// vite-react-ssg entry. `npm run build` (vite-react-ssg build) prerenders every
// route in `routes` (+ the dynamic paths from includedRoutes) to static HTML;
// dev / client hydration use the same route table.
export const createRoot = ViteReactSSG({ routes });

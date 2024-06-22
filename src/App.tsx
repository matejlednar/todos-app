import { Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { NotFound } from "./pages/not-found/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <header className="p-4 text-center shadow bg-purple-950 text-cyan-400">
        <h1 className="text-5xl font-semibold shadow-lg">TODOS</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

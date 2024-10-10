import { Typography, Card } from "@material-tailwind/react";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <Header />

      <Typography variant="h1">Main</Typography>
    
    </div>
  );
}

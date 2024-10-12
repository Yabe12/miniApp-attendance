import React from "react";
import StudentForm from "./page/StudentForm"; // Make sure the path is correct based on your project structure
import './index.css'; // Import Tailwind CSS styles

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <StudentForm />
    </div>
  );
}

export default App;

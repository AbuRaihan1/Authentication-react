import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <h1 className='text-3xl'>Welcome to Authentech</h1> */}
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

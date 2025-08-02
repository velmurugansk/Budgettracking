import { useRoutes } from "react-router-dom";
import Login from "./pages/sign/Login";
import Register from "./pages/sign/Register";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Income from "./pages/income/Income";
import Expense from "./pages/expense/Expense";


const routepaths = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'income', element: <Income /> },
      { path: 'expense', element: <Expense /> },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Register />
  }
]

function App() {

  const response = useRoutes(routepaths);

  return (
    <>      
      {response}
    </>
  )
}

export default App

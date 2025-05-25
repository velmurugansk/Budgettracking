


function App() {
  
  const themeChange = () => {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <>
    <p className="text-3xl p-2 font-bold bg-[var(--backgroundcolor)] text-[var(--textcolor)]">Hai</p>
    <button onClick={themeChange}>theme</button>
    </>
  )
}

export default App

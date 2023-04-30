import { createContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);
const AppDispatchContext = createContext(undefined);

function AppProvider({ children }) {
  const [details, setDetails] = useState({
    lang: "cn",
    theme: "light",
    page: "intro",
    active: false,
  });

  useEffect(() => {
    const curDetails = localStorage.getItem("details");
    if (curDetails) {
      setDetails(JSON.parse(curDetails));
    }
  }, []);

  useEffect(() => {
    if (details != null) {
      localStorage.setItem("details", JSON.stringify(details));
    } else {
      localStorage.removeItem("details");
    }
  }, [details]);

  return (
    <AppContext.Provider value={details}>
      <AppDispatchContext.Provider value={setDetails}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export { AppContext, AppDispatchContext, AppProvider };

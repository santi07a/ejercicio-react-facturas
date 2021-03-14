import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [datos, setDatos] = useState(null);
  const [spinner, setSpinner] = useState("on");

  useEffect(() => {
    (async () => {
      const resp = await fetch(url);
      const facturasJSON = await resp.json();
      setDatos(facturasJSON);
      setSpinner("off");
    })();
  }, [url]);

  return {
    datos,
    spinner
  };
};

export default useFetch;

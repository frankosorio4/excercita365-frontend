async function useBuscaCep(cep) {
  try {
    if (!cep) {
      throw new Error("CEP is required");
    }
    const response = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    console.log("Data fetched:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data for CEP:", error);
    return null;
  }
}

export default useBuscaCep;
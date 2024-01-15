//const host_predict = "http://127.0.0.1:5000/predict";
const host_predict = "https://api-cheque-cl-rw3fmfrljq-uc.a.run.app/predict";

export const predictImage = async (data: { file: File; threshold: number }) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("threshold", `${data.threshold}`);
  try {
    const response = await fetch(host_predict, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

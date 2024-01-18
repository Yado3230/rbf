import { RiskRequest, RiskResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllRisks = async (): Promise<RiskResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/risks`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createRisk = async (
  values: RiskRequest
): Promise<RiskResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/risks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteRisk = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/risks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editRisk = async (
  values: RiskRequest,
  id: number
): Promise<RiskResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/risks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

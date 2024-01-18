import { CapTableRequest, CapTableResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllReturnCapTables = async (): Promise<CapTableResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/payoff-months`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createReturnCapTable = async (
  values: CapTableRequest
): Promise<CapTableResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/payoff-months`, {
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

export const deleteReturnCapTable = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/payoff-months/${id}`, {
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

export const editReturnCapTable = async (
  values: CapTableRequest,
  id: number
): Promise<CapTableResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/payoff-months/${id}`, {
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

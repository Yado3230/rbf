import { CohortRequest, CohortResponse } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllCohorts = async (): Promise<CohortResponse[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/cohorts`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCohort = async (id: string): Promise<CohortResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/cohorts/${id}`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createCohort = async (
  values: CohortRequest
): Promise<CohortResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/cohorts`, {
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

export const deleteCohort = async (id: string): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/cohorts/${id}`, {
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

export const editCohort = async (
  values: CohortRequest,
  id: string
): Promise<CohortResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/cohorts/${id}`, {
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

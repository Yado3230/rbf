import {
  RevenueProjectionTypeRequest,
  RevenueProjectionTypeResponse,
  RevenueShareTypeRequest,
  RevenueShareTypeResponse,
} from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllRevenueProjectionTypes = async (): Promise<
  RevenueProjectionTypeResponse[]
> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/revenue-projection-types/default`
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueProjectionTypesByCohortId = async (
  cohortId: number
): Promise<RevenueProjectionTypeResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/revenue-projection-types?cohortId=${cohortId}`
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueShareTypes = async (): Promise<
  RevenueShareTypeResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-types/default`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueShareTypesByCohortId = async (
  cohortId: number
): Promise<RevenueShareTypeResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/revenue-share-types?cohortId=${cohortId}`
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createRevenueProjectionType = async (
  values: RevenueProjectionTypeRequest
): Promise<RevenueProjectionTypeResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-projection-types`, {
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

export const createRevenueShareType = async (
  values: RevenueShareTypeRequest
): Promise<RevenueShareTypeResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-types`, {
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

export const deleteRevenueShareType = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-types/${id}`, {
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

export const deleteRevenueProjectionType = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-projection-types/${id}`, {
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

export const editRevenueProjectionType = async (
  values: RevenueProjectionTypeRequest,
  id: number
): Promise<RevenueProjectionTypeResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-projection-types/${id}`, {
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

export const editRevenueShareType = async (
  values: RevenueShareTypeRequest,
  id: number
): Promise<RevenueShareTypeResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-types/${id}`, {
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

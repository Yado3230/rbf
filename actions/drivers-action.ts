import {
  RevenueDriverRequest,
  RevenueDriverResponse,
  RevenueShareDriverRequest,
  RevenueShareDriverResponse,
} from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllRevenueDrivers = async (): Promise<
  RevenueDriverResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-drivers/default`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueDriversByCohortId = async (
  cohortId: number
): Promise<RevenueDriverResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/revenue-drivers?cohortId=${cohortId}`
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueShareDrivers = async (): Promise<
  RevenueShareDriverResponse[]
> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-drivers/default`);
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllRevenueShareDriversByCohortId = async (
  cohortId: number
): Promise<RevenueShareDriverResponse[]> => {
  try {
    const res = await fetch(
      `${API_URL}api/v1/revenue-share-drivers?cohortId=${cohortId}`
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createRevenueDriver = async (
  values: RevenueDriverRequest
): Promise<RevenueDriverResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-drivers`, {
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

export const createRevenueShareDriver = async (
  values: RevenueShareDriverRequest
): Promise<RevenueShareDriverRequest> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-drivers`, {
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

export const deleteRevenueShareDriver = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-drivers/${id}`, {
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

export const deleteRevenueDriver = async (id: number): Promise<[]> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-drivers/${id}`, {
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

export const editRevenueDriver = async (
  values: RevenueDriverRequest,
  id: number
): Promise<RevenueDriverResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-drivers/${id}`, {
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

export const editRevenueShareDriver = async (
  values: RevenueShareDriverRequest,
  id: number
): Promise<RevenueShareDriverResponse> => {
  try {
    const res = await fetch(`${API_URL}api/v1/revenue-share-drivers/${id}`, {
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

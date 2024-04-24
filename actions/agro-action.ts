// import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL_AGRO;

// export default async function getAsset(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const endpoint = "https://10.1.177.121:8884/api/assets";
//     const response = await fetch(endpoint);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch data" });
//   }
// }

// export const getAsset = async () => {
//   try {
//     const res = await fetch("http://10.1.177.121:8884/api/assets");
//     const responseData = await res.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export const getAllAgroData = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getFainc = async () => {
  try {
    const response = await fetch(`${API_URL}api/scoringData`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawData = await response.json();
    const filteredData = rawData.filter(
      (item) => item.scoringDataType === "ANNUALFARMINCOME"
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

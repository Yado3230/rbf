import { NextApiRequest, NextApiResponse } from "next";

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

export const getAsset = async () => {
  try {
    const res = await fetch("http://10.1.177.121:8884/api/assets");
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

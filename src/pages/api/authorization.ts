import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async (req: NextRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/request-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

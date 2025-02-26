import axios from "./axios";
import {
  GetWinesParams,
  GetWinesResponse,
  PostWine,
  Wine,
} from "../types/wineTypes";
import { feachWine } from "@/types/myProfileTypes";

export const getWines = async (
  params: GetWinesParams
): Promise<GetWinesResponse> => {
  try {
    const res = await axios.get<GetWinesResponse>("wines", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching wines", error);
    throw error;
  }
};

export const getRecommendedWines = async (
  params: GetWinesParams
): Promise<Wine[]> => {
  try {
    const res = await axios.get<Wine[]>("wines/recommended", {
      params,
    });
    return res.data;
  } catch (error) {
    // console.log("Error fetching recommended Wines", error);
    throw error;
  }
};

export const postWine = async ({
  name,
  price,
  region,
  image,
  type,
}: PostWine): Promise<PostWine> => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await axios.post<PostWine>(
      "wines",
      {
        name,
        price,
        region,
        image,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("와인 등록에 실패했습니다.", error);
    throw error;
  }
};

export const deleteWine = async (id: number) => {
  let res;
  try {
    const token = localStorage.getItem("accessToken");
    res = await axios.delete(`wines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }

  return res.status === 200;
};

export const editWine = async (wineId: number, wineData: feachWine) => {
  const token = localStorage.getItem("accessToken");

  const { id, userId, reviewCount, recentReview, ...dataToPatch } = wineData;

  try {
    await axios.patch(`wines/${wineId}`, dataToPatch, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("와인 수정에 실패했습니다.", error);
    throw error;
  }
};

import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export default class ServiceBase {
  public static baseDomain =
    window.location.hostname === "localhost" || !process.env.VUE_APP_API_DOMAIN
      ? "localhost"
      : process.env.VUE_APP_API_DOMAIN;

  public static client = axios.create({
    baseURL: window.location.protocol + "//" + ServiceBase.baseDomain,
    responseType: "json",
    headers: {
      "Content-Type": "application/json"
    },
    validateStatus: () => true
  });
}

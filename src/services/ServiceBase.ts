import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export default class ServiceBase {
    public static baseURL =
        window.location.hostname === "localhost" ? "http://localhost:3000" : "";

    public static client = axios.create({
        baseURL: ServiceBase.baseURL,
        responseType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        validateStatus: () => true
    });
}

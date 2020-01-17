import jwt from "jsonwebtoken";
import ServiceBase from "./ServiceBase";

const DEFAULT_LEAWAY_MS = 6 * 60 * 60 * 1000;

export default class TokenService {
  constructor() {
    ServiceBase.client.interceptors.request.use(config => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = "Bearer " + this.getToken();
      }

      return config;
    });
  }

  public getToken(): string | null {
    return JSON.parse(localStorage.getItem("token") || "null");
  }

  public setToken(token: string) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  public getData(): any {
    const token = this.getToken();
    return token === null ? null : jwt.decode(token);
  }

  public isValid(date: Date | undefined = undefined): boolean {
    const now = (date || Date.now()).valueOf() / 1000;
    const decoded = this.getData();

    if (!decoded) {
      return false;
    }

    if (decoded.exp < now) {
      return false;
    }

    return true;
  }

  public aboutToExpire(msTillDeath = DEFAULT_LEAWAY_MS): boolean {
    return !this.isValid(new Date(Date.now() + msTillDeath));
  }

  public refresh() {
    ServiceBase.client.post("/auth/refresh").then(resp => {
      const newToken = resp.data.data;
      const newTokenDecoded = jwt.decode(newToken) as {
        [key: string]: any;
      };
      if (newTokenDecoded !== null) {
        this.setToken(newToken);
      }
    });
  }

  public startRefreshTimer() {
    setInterval(() => {
      if (this.aboutToExpire()) {
        this.refresh();
      }
    }, 30 * 1000);
  }
}

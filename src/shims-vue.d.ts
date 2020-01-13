import Vue from "vue";
import TokenService from "../src/services/TokenService";

declare module "vue/types/vue" {
    interface Vue {
        $token: TokenService;
    }
}

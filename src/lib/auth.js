import { api } from "$lib/api";
import decode from "jwt-decode";
import { tick } from "svelte";
import { get } from "svelte/store";
import { password, prompt, token } from "$lib/store";
import PasswordPrompt from "$components/PasswordPrompt";

export const requireLogin = async () => {
  refreshToken();
  await tick();
  let $token = get(token);
  if (!$token || decode($token).exp * 1000 < Date.now()) {
    go("/login");
    throw new Error("Login required");
  }
};

export const requirePassword = async () => {
  await requireLogin();
  let unsub;
  await new Promise(
    (resolve) =>
      (unsub = password.subscribe(($password) =>
        $password ? resolve() : prompt.set(PasswordPrompt)
      ))
  );
  unsub();
};

export const refreshToken = () => {
  api
    .url("/auth/token/refresh")
    .get()
    .json(({ jwt_token: t }) => {
      token.set(t);
      window.sessionStorage.setItem("token", t);
    });
};

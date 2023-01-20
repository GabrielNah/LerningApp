import router from "../Router";

export async function  redirectToRoute(name) {
    return await router.push({name})
}

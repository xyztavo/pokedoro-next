import { getCookie } from "cookies-next"
import { meRoute } from "./lib/axios"

export const putRandomUserPoke = async () => {
    const authToken = getCookie('auth')
    const res = await meRoute.put(`pokemons/random`, {}, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res.data
}
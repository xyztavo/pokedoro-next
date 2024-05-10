import axios from "axios"
import { getCookie } from "cookies-next"

export const putRandomUserPoke = async () => {
    const randomId = Math.floor(Math.random() * 650)
    const authToken = getCookie('auth')
    const res = await axios.put(`http://localhost:8787/user/pokemon`, { pokemonId: randomId }, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res.data
}
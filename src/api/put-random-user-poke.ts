import axios from "axios"
import { getCookie } from "cookies-next"
import env from '@/lib/config.json'
export const putRandomUserPoke = async () => {
    const randomId = Math.floor(Math.random() * 650)
    const authToken = getCookie('auth')
    const res = await axios.put(`${env.API_BASE_URL}/user/pokemon`, { pokemonId: randomId }, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res.data
}
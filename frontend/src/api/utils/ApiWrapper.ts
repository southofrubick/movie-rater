import axios, { AxiosError } from 'axios'

export async function Get(subroute: string) {
    let error: AxiosError | null = null

    const result = await axios.get(`http://localhost:5223/movies${subroute}`)
        .then((response) => response.data)
        .catch((e) => {
            error = e
        })

    return { error, result }
}

export async function Post(subroute: string, body: string, contentType: string = 'application/json') {
    let error: AxiosError | null = null

    const result = await axios.post(
        `http://localhost:5223/movies${subroute}`,
        "\"" + body + "\"",
        {
            headers: {
                "Content-Type": contentType,
            }
        },
    )
        .then((response) => response.data)
        .catch((e) => {
            error = e
        })

    return { error, result }
}

export async function Put(subroute: string, body: string, contentType: string = 'application/json') {
    let error: AxiosError | null = null

    const result = await axios.put(
        `http://localhost:5223/movies${subroute}`,
        "\"" + body + "\"",
        {
            headers: {
                "Content-Type": contentType,
            }
        },
    )
        .then((response) => response.data)
        .catch((e) => {
            error = e
        })

    return { error, result }
}

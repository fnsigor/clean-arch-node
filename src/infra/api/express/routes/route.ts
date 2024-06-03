import { Request, Response } from "express"

export type HttpMethod = 'get' | 'post'

//isso aqui é o mesmo que criar um enum
//enums tendem a ter problemas de performance
export const HttpMethod = {
    GET: 'get' as HttpMethod,
    POST: 'post' as HttpMethod
} as const

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>
    getPath(): string
    getMethod(): HttpMethod
}
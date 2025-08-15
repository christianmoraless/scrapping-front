// src/api/httpClient.ts
import { apiConfig } from './config';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from 'axios';

class HttpClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: apiConfig.baseURL,
            timeout: apiConfig.timeout,
            headers: apiConfig.headers,
            withCredentials: apiConfig.withCredentials,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Interceptor de respuestas
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                // Manejo centralizado de errores
                if (error.response) {
                    const { status, data } = error.response;

                    switch (status) {
                        case 401:
                            console.error('No autorizado - Redirigir a login');
                            break;
                        case 403:
                            console.error('Acceso prohibido');
                            break;
                        case 404:
                            console.error('Recurso no encontrado');
                            break;
                        case 500:
                            console.error('Error interno del servidor');
                            break;
                        default:
                            console.error(`Error no manejado: ${status}`);
                    }

                    return Promise.reject({
                        status,
                        //@ts-ignore
                        message: data?.message || 'Error desconocido',
                        //@ts-ignore
                        details: data?.errors || null,
                    });
                } else if (error.request) {
                    console.error('No se recibió respuesta del servidor');
                } else {
                    console.error('Error al configurar la solicitud', error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get<T>(url, config).then((response: any) => response.data);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post<T>(url, data, config).then((response: any) => response.data);
    }
}

export const httpClient = new HttpClient();
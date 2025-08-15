// hooks/useSocialData.ts
import { useState, useEffect } from 'react';
import type { ByPlatform, Data } from '../internals/interfaces/SocialMediaInformation';
import { httpClient } from '../api/httpClient';

export interface SocialData {
    data: Data;
    status: number;
}

export const useSocialData = () => {
    const [data, setData] = useState<SocialData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await httpClient.get<SocialData>('/scrapper/info-profiles'); // Ajusta tu endpoint
            setData(response);
        } catch (err: any) {
            setError(err.message || 'Error obteniendo datos sociales');
        } finally {
            setLoading(false);
        }
    };

    // Recargar datos manualmente
    const refetch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Función para obtener datos específicos de plataforma
    const getPlatformData = (platform: keyof ByPlatform) => {
        return data?.data.byPlatform[platform] || null;
    };

    // Función para obtener métricas unificadas
    const getUnifiedData = () => {
        return data?.data.unified || [];
    };

    // Función para obtener métricas generales
    const getMetrics = () => {
        return data?.data.metrics || null;
    };

    return {
        data,
        loading,
        error,
        refetch,
        getPlatformData,
        getUnifiedData,
        getMetrics
    };
};
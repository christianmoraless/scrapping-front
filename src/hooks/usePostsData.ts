// hooks/usePostsData.ts
import { httpClient } from '../api/httpClient';
import { useState, useEffect, useCallback } from 'react';

export const usePostsData = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<{
        source: string;
        minLikes: number | '';
        search: string;
    }>({
        source: '',
        minLikes: '',
        search: ''
    });

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            const response: any = await httpClient.get('/scrapper/unified-social-posts');
            setPosts(response ?? []);
            setFilteredPosts(response);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los posts');
            setLoading(false);
        }
    }, []);

    // Aplicar filtros localmente
    const applyFilters = useCallback(() => {
        let result = [...posts];

        // Filtro por fuente
        if (filters.source) {
            result = result.filter(post =>
                post.source.toLowerCase().includes(filters.source.toLowerCase())
            );
        }

        // Filtro por likes mínimos
        if (filters.minLikes !== '') {
            result = result.filter(post =>
                post.likesCount >= (filters.minLikes as number)
            );
        }

        // Filtro por búsqueda en contenido
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(post =>
                post.content.toLowerCase().includes(searchTerm) ||
                (post.author && post.author.toLowerCase().includes(searchTerm))
            );
        }

        setFilteredPosts(result);
    }, [filters, posts]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (posts.length > 0) {
            applyFilters();
        }
    }, [filters, posts, applyFilters]);

    const refetch = () => {
        setError(null);
        fetchPosts();
    };

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return {
        posts: filteredPosts,
        loading,
        error,
        refetch,
        updateFilters,
        currentFilters: filters
    };
};

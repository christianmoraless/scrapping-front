// components/PostsTable.tsx
import React, { useEffect, useMemo, useState, type JSX } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Modal,
    Stack,
    Chip,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Grid
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { usePostsData } from '../hooks/usePostsData';
import { Container } from './Structure';

const getColumns = (): GridColDef[] => [
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'author', headerName: 'Autor', flex: 1 },
    {
        field: 'content',
        headerName: 'Contenido',
        flex: 2,
        renderCell: (params) => (
            <Box sx={{
                maxHeight: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
            }}>
                {params.value}
            </Box>
        )
    },
    { field: 'likesCount', headerName: 'Likes', flex: 1, type: 'number' },
    { field: 'commentsCount', headerName: 'Comentarios', flex: 1, type: 'number' },
    {
        field: 'timestamp',
        headerName: 'Fecha',
        flex: 1,
        type: 'date',
        valueFormatter: (params: any) => {
            return params.value;
        }
    },
    {
        field: 'source',
        headerName: 'Fuente',
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value}
                color={
                    params.value.toLowerCase() === 'instagram' ? 'secondary' :
                        params.value.toLowerCase() === 'facebook' ? 'primary' :
                            params.value.toLowerCase() === 'tiktok' ? 'default' : 'success'
                }
            />
        )
    },
];
// Componente para el modal de detalles
const PostDetailsModal = ({ post, open, onClose }: { post: any | null; open: boolean; onClose: () => void }) => {
    if (!post) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="post-detail-modal-title"
            aria-describedby="post-detail-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: 800,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <Typography id="post-detail-modal-title" variant="h5" component="h2" gutterBottom>
                    Detalles del Post
                </Typography>

                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Autor: {post.author} | Fecha: {post.timestamp ? new Date(post.timestamp).toLocaleString() : 'N/A'}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {post.content}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip label={`Likes: ${post.likesCount}`} />
                            {/* <Chip label={`Comentarios: ${post.commentsCount}`} /> */}
                            {post.extra?.hashtags?.map((tag: any, index: number) => (
                                <Chip key={index} label={`#${tag}`} color="primary" />
                            ))}
                        </Stack>
                        {post.thumbnailUrl && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <img src={post.thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: 300 }} />
                            </Box>
                        )}
                    </CardContent>
                </Card>

                <Typography variant="h6" gutterBottom>
                    Comentarios
                </Typography>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {post.comments.map((comment: any, index: number) => (
                        <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                            <CardContent>
                                <Typography variant="subtitle2">{comment.author}</Typography>
                                <Typography variant="body2">{comment.text}</Typography>
                                <Stack direction="row" spacing={1} mt={1}>
                                    <Chip label={`Likes: ${comment.likesCount}`} size="small" />
                                    <Typography variant="caption">
                                        {comment.timestamp ? new Date(comment.timestamp).toLocaleString() : comment.timeText}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

// Componente de filtros
const FiltersSection = ({
    updateFilters,
    currentFilters
}: {
    updateFilters: (filters: any) => void;
    currentFilters: any;
}) => {
    const [localFilters, setLocalFilters] = useState(currentFilters);

    // Sincronizar cuando los filtros externos cambian
    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        const { name, value } = e.target;
        setLocalFilters({
            ...localFilters,
            [name]: value
        });
    };

    const applyFilters = () => {
        updateFilters(localFilters);
    };

    const resetFilters = () => {
        const reset = {
            source: '',
            minLikes: '',
            search: ''
        };
        setLocalFilters(reset);
        updateFilters(reset);
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Filtros</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, lg: 12 }} >
                    <TextField
                        fullWidth
                        name="search"
                        label="Buscar en contenido o autor"
                        value={localFilters.search}
                        onChange={handleChange}
                        size="small"
                        onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                    />
                </Grid>

                <Grid size={{ xs: 6, lg: 6 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Fuente</InputLabel>
                        <Select
                            name="source"
                            value={localFilters.source}
                            onChange={handleChange}
                            label="Fuente"
                        >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="facebook">Facebook</MenuItem>
                            <MenuItem value="instagram">Instagram</MenuItem>
                            <MenuItem value="twitter">Twitter</MenuItem>
                            <MenuItem value="tiktok">TikTok</MenuItem>
                            <MenuItem value="youtube">Youtube</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 6, lg: 6 }} >
                    <TextField
                        fullWidth
                        name="minLikes"
                        label="Mín. Likes"
                        type="number"
                        value={localFilters.minLikes}
                        onChange={handleChange}
                        size="small"
                        inputProps={{ min: 0 }}
                        onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                    />
                </Grid>

                <Grid sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    <Button
                        variant="contained"
                        onClick={applyFilters}
                        fullWidth
                    >
                        Aplicar Filtros
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={resetFilters}
                        fullWidth
                    >
                        Limpiar Filtros
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};


export const UnifiedSocialPosts = () => {
    const {
        posts,
        loading,
        error,
        refetch,
        updateFilters,
        currentFilters
    } = usePostsData();
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const columns = useMemo(() => getColumns(), []);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const handleRowClick = (params: any) => {
        setSelectedPost(params.row as any);
        setOpenModal(true);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <Typography variant="h6">Cargando posts...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
                <Typography variant="h6" color="error" gutterBottom>
                    Error: {error}
                </Typography>
                <Button onClick={refetch} variant="contained" color="primary">
                    Reintentar
                </Button>
            </Box>
        );
    }

    return (
        <Container>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                    Gestión de Posts
                </Typography>

                <FiltersSection
                    updateFilters={updateFilters}
                    currentFilters={currentFilters}
                />

                <Paper sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        loading={loading}
                        rows={posts}
                        columns={columns}
                        getRowId={(row) => row.id}
                        onRowClick={handleRowClick}
                        pageSizeOptions={[5, 10, 25]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        disableRowSelectionOnClick
                    />
                </Paper>
            </Box>
            <PostDetailsModal
                post={selectedPost}
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </Container>
    );
};
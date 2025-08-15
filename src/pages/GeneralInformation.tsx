// components/SocialDashboard.tsx
import React, { type JSX } from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Stack,
    Paper
} from '@mui/material';
import {
    DataGrid,
    type GridColDef,
} from '@mui/x-data-grid';

import { useSocialData } from '../hooks/useGeneralSocialMediaInformation';
import { Container } from '../components/Structure';
import type { StatCardProps } from '../components/StatCard';
import type { MetricsCardsProps } from '../internals/interfaces/SocialMediaInformation';


const columns: GridColDef[] = [
    { field: 'platform', headerName: 'Plataforma', flex: 1 },
    { field: 'username', headerName: 'Usuario', flex: 1, },
    { field: 'description', headerName: 'Descripcion', flex: 1, },
    { field: 'followers', headerName: 'Seguidores', flex: 1 },
    {
        field: 'profileUrl', headerName: 'URL del perfil', flex: 1, renderCell(params) {
            return (<><a href={params.row.profileUrl} target='_blank' style={{ color: "#fafafa", textDecoration: 'none' }}>Ir al perfil</a></>)
        },
    },
    {
        field: 'verified', headerName: 'Cuenta verificada', flex: 1, renderCell(params) {
            return (<>{params.row.verified ? <>Verificada</> : 'Sin verificar'}</>)
        },
    },
];
const StatCard = ({
    title,
    value,
}: {
    title: string;
    value: string | number;
}) => {

    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack direction="column" sx={{ gap: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4" component="p">
                            {typeof value === 'number'
                                ? value.toLocaleString()
                                : value}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const GeneralInformation = () => {
    const {
        data: socialData,
        loading,
        error,
        refetch,
        getUnifiedData,
        getMetrics
    } = useSocialData();

    const unifiedData = getUnifiedData();
    const metrics = getMetrics();

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <Typography variant="h6">Loading social data...</Typography>
        </Box>
    );

    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column">
            <Typography variant="h6" color="error" gutterBottom>
                Error: {error}
            </Typography>
            <button
                onClick={refetch}
                style={{
                    padding: '10px 20px',
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Retry
            </button>
        </Box>
    );

    return (
        <Container>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                    Social Media Dashboard
                </Typography>

                <Box>
                    <MetricsCards metrics={metrics!} />
                </Box>
                <Box>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            loading={loading}
                            disableMultipleRowSelection
                            rowSelection={false}
                            rows={unifiedData}
                            columns={columns}
                            getRowId={(row) => `${row.platform}-${row.username}`}
                            checkboxSelection
                            hideFooterPagination={true}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export const getMetricsConfig = (metrics: any): StatCardProps[] => {
    const trendData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
    return [
        {
            title: "Total de seguidores",
            value: metrics.totalFollowers.toLocaleString(),
            interval: "Across all platforms",
            trend: "up",
            data: trendData
        },
        {
            title: "Total de likes",
            value: metrics.totalLikes.toLocaleString(),
            interval: "Last 30 days",
            trend: "up",
            data: trendData
        },
        {
            title: "Total de publicaciones y videos",
            value: metrics.totalPosts.toLocaleString(),
            interval: "All time",
            trend: "neutral",
            data: trendData
        },
        {
            title: "Cuentas verificadas",
            value: metrics.verifiedAccounts.toString(),
            interval: "Platforms verified",
            trend: metrics.verifiedAccounts > 0 ? "up" : "neutral",
            data: trendData
        },
    ];
};

export const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
    const metricsConfig = getMetricsConfig(metrics);

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {metricsConfig.map((metric, index) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                    <StatCard {...metric} />
                </Grid>
            ))}
        </Grid>
    );
};

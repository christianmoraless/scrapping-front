import React from 'react';
import AppNavbar from './AppNavbar';
import SideMenu from './SideMenu';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Header from './Header';

interface Props {
    children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{ mx: 3, pb: 5, mt: { xs: 8, md: 0 }, }}
                >
                    <Header />
                    <Box>
                        {children}
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}


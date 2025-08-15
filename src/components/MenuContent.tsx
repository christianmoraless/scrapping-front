import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import { NavLink } from 'react-router';

const mainListItems = [
  { text: 'Informacion general', icon: <AnalyticsRoundedIcon />, path: '/' },
  { text: 'Datos de redes sociales', icon: <AnalyticsRoundedIcon />, path: '/social-media-posts' },
  { text: 'Estadisticas de interaccion', icon: <AnalyticsRoundedIcon />, path: '/charts' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <NavLink to={item.path} style={{ textDecoration: 'none', color: '#fafafa' }}>
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Stack>
  );
}

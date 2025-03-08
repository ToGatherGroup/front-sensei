"use client"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindHover } from 'material-ui-popup-state';
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const iconStyle = {
  stroke: "white",
  fillOpacity: 0,
  className: "stroke-[1.5]",
  size: 28
}

const menuItems = [
  {
    label: 'Atletas', 
    icon: <User {...iconStyle} />,
    childrens: [
      {
        label: 'Buscar',
        path: '/atleta/buscar',
        icon: <UserSearch {...iconStyle} />
      },
      {
        label: 'Cadastrar', 
        path: '/atleta/cadastrar',
        icon: <Image src="/header_icons/add_atletas.png" width={30} height={30} alt='' className='h-fit' ></Image>
      },
      {
        label: 'Aniversariantes', 
        path: '/atleta/aniversariantes',
        icon: <BirthdayCake {...iconStyle} />
      }
    ]
  },
  {
    label: 'Chamada', 
    path: '/chamada',
    icon: <Image src="/header_icons/chamada.png" width={20} height={20} alt='' className="h-fit"></Image>
  },
  {
    label: 'Avaliação', 
    path: '/valencia/menu',
    icon: <Assessment {...iconStyle}/>
  },
  {
    label: 'Grupos', 
    path: '/grupos',
    icon: <UserGroup {...iconStyle} />
  },
  {
    label: "Comparativo",
    path: "/comparison",
    icon: <Image src="/header_icons/versus.png" width={25} height={25} alt='' className="h-fit"></Image>
  },
  {
    label: 'Relatório', 
    icon: <Image src="/header_icons/relatorio.png" width={20} height={20} alt='' className="h-fit" />,
    childrens: [
      {
        label: 'Estatísticas', 
        path: '/estatisticas',
        icon: <ChartLineData {...iconStyle} />
      },
      {
        label: 'Avaliação', 
        path: '/relatorioAvaliacao',
        icon: <Image src="/header_icons/avaliacao.png" width={30} height={30} alt='' className="h-fit" />
      },
      {
        label: 'Frequência', 
        path: '/frequencia',
        icon: <Percent {...iconStyle} />
      },
    ]
  },
];

const settings = ['Meu usuário', 'Sair'];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [position, setPosition] = useState<"sticky" | "static">("static"); // Inicialização sem acessar `window`

  useEffect(() => {
    setPosition(window.innerWidth <= 1050 ? "sticky" : "static");

    const handleResize = () => {
      setPosition(window.innerWidth <= 1050 ? "sticky" : "static");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position={position}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{display: 'flex', width: 'max-content', flex: '1', justifyContent: 'center', alignItems: 'center', "@media (max-width:1050px)": { flexDirection: 'row-reverse'}}}>
            {/* Logo Sensei para DESKTOP */}
            <Box sx={{
              display: "none",
              "@media (min-width:1050px)": {
                display: "flex",
              },
            }}>
              <Link
                href={"/"}
              >
                <Image
                  width={90}
                  height={50}
                  alt="Logotipo Sensei"
                  src="/logo_sensei_white.png"
                  className='mr-4 hidden min-[900px]:flex'
                />
              </Link>
            </Box>

            {/* Menu sanduíche para Mobile */}
            <Box sx={{ 
              flexGrow: 1, 
              display: "none",
              "@media (max-width:1050px)": {
                display: "flex",
                justifyContent: 'flex-end'
              }
              }}>
              <MobileDrawer />
            </Box>

            {/* Logo Sensei para Mobile */}
            <Box sx={{ flexGrow: 1, display: "none",
              "@media (max-width:1050px)": {
                display: "flex",
                justifyContent: 'center'
              } }}>
              <Link
                href={"/"}
              >
                <Image
                  width={90}
                  height={50}
                  alt="Logotipo Sensei"
                  src="/logo_sensei_white.png"
                  className='hidden max-[1050px]:flex'
                  />
              </Link>
            </Box>

            {/* Menu Items para Desktop */}
            <Box sx={{ 
              flexGrow: 1, 
              display: "none",
              "@media (min-width:1050px)": {
                display: "flex",
              },
              marginLeft: '24px', gap: '24px' 
            }}>
              {menuItems.map((item) => (
                <>
                  {item.childrens ?
                    <PopupState variant="popover" popupId={item.label} key={item.label}>
                      {(popupState) => (
                        <>
                          <Button  {...bindHover(popupState)} sx={{ my: 2, color: 'white', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                            {item.icon}
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{item.label}</Typography>
                            {popupState.isOpen ? 
                              <ExpandLess sx={{ color: 'white' }} />
                              :
                              <ExpandMore sx={{ color: 'white' }} />
                            }

                          </Button>
                          <HoverMenu
                            {...bindMenu(popupState)} 
                            sx={(theme) => ({
                              '& .MuiPaper-root': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.paper
                              },
                              '& .MuiMenuItem-root:hover': {
                                  backgroundColor: theme.palette.secondary.main,
                                }
                            })}
                          >
                            {item.childrens.map((itemChildren) => (
                              <MenuItem onClick={popupState.close} key={itemChildren.label}>
                                <Link href={itemChildren.path} className="flex gap-3 justify-center items-center">
                                  <Box sx={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    {itemChildren.icon}
                                  </Box>
                                  <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{itemChildren.label}</Typography>
                                </Link>
                              </MenuItem>
                            ))}
                          </HoverMenu>
                        </>
                      )}
                    </PopupState>
                    :
                    <Button
                      key={item.label}
                      sx={{ my: 2, color: 'white'}}
                    >
                      <Link href={item.path} className='flex gap-2 items-center'>
                        {item.icon}
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{item.label}</Typography>
                      </Link>
                  </Button>
                  }
                </>
              ))}
            </Box>

            {/* Menu de configurações Mobile/Desktop */}
            <Box sx={{ flexGrow: 1 }}>
              <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#fff' }} >
                  <AccountBoxIcon style={{ fontSize: '36px' }}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={(theme) => (
                  { 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.paper,
                    },
                    '& .MuiMenuItem-root:hover': {
                      backgroundColor: theme.palette.secondary.main,
                    }
                  }
                )}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;


import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import User from '../../../public/svg/User';
import UserSearch from '../../../public/svg/UserSearch';
import BirthdayCake from '../../../public/svg/BirthdayCake';
import UserGroup from '../../../public/svg/UserGroup';
import ChartLineData from '../../../public/svg/ChartLineData';
import Percent from '../../../public/svg/Percent';
import Assessment from '../../../public/svg/Assessment';

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [openSubmenu, setOpenSubmenu] = useState('')

  const handleSubmenuClick = (event:any, submenuLabel: string) => {
    event.stopPropagation()
    if (openSubmenu == submenuLabel){
      setOpenSubmenu('')
    } else {
      setOpenSubmenu(submenuLabel)
    }
  }

  const isSubmenuOpened = (submenuLabel: string) => {
    return submenuLabel == openSubmenu
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((menuItem) => (
          menuItem.childrens ?
          <Box key={menuItem.path}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleSubmenuClick(event, menuItem.label)}>
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
                {isSubmenuOpened(menuItem.label) ? <ExpandLess sx={{ color: 'white' }}/> : <ExpandMore sx={{ color: 'white' }} />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openSubmenu == menuItem.label} timeout="auto" unmountOnExit >
            <List component="div" disablePadding>
            {menuItem.childrens.map((menuItemChildren) => (
              <Link href={menuItemChildren.path} key={menuItemChildren.label}>
                <ListItemButton sx={{ pl: 4 }} key={menuItemChildren.label}>
                  <ListItemIcon>
                    {menuItemChildren.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItemChildren.label} />
                </ListItemButton>
              </Link>
            ))}
            </List>
            </Collapse>
          </Box>
          :
          <ListItem key={menuItem.path} disablePadding>
            <Link href={menuItem.path}>
              <ListItemButton>
                <ListItemIcon>
                {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="menu de navegação"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' sx={(theme) => ({
        '& .MuiDrawer-paper': {
          bgcolor: theme.palette.primary.main,
        },
        '& .MuiTypography-root': {
          color: theme.palette.background.paper
        }
        })}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
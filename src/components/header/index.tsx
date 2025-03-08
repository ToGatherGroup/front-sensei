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

const DESKTOP_WIDTH_BREAKPOINT = 1130

const iconStyle = {
  stroke: "white",
  fillOpacity: 0,
  className: "stroke-[1.5] min-w-[28px]",
  size: 28
}

const menuItems = [
  {
    label: 'Atletas', 
    icon: <SvgUser {...iconStyle} />,
    childrens: [
      {
        label: 'Buscar',
        path: '/atleta/buscar',
        icon: <SvgUserSearch {...iconStyle} />
      },
      {
        label: 'Cadastrar', 
        path: '/atleta/cadastrar',
        icon: <SvgAddUser {...iconStyle} />
      },
      {
        label: 'Aniversariantes', 
        path: '/atleta/aniversariantes',
        icon: <SvgBirthdayCake {...iconStyle} />
      }
    ]
  },
  {
    label: 'Chamada', 
    path: '/chamada',
    icon: <SvgChecklist {...iconStyle} />
  },
  {
    label: 'Avaliação', 
    icon: <SvgAssessment {...iconStyle}/>,
    childrens: [
      {
        label: 'Nova Avaliação', 
        icon: <SvgAddAssessment {...iconStyle}/>,
        path: '/valencia/menu',
      },
      {
        label: 'Buscar', 
        icon: <SvgFileSearch {...iconStyle} className="stroke-[1]" />,
        path: '/relatorioAvaliacao'
      },
    ]
  },
  {
    label: 'Grupos', 
    path: '/grupos',
    icon: <SvgUserGroup {...iconStyle} />
  },
  {
    label: "Comparativo",
    path: "/comparison",
    icon: <SvgVersus {...iconStyle} />
  },
  {
    label: "Notas",
    path: "/notes",
    icon: <SvgNotebook {...iconStyle} />
  },
  {
    label: 'Relatório', 
    icon: <SvgReport {...iconStyle} />,
    childrens: [
      {
        label: 'Estatísticas', 
        path: '/estatisticas',
        icon: <SvgChartLineData {...iconStyle} />
      },
      {
        label: 'Frequência', 
        path: '/frequencia',
        icon: <SvgPercent {...iconStyle} />
      },
      {
        label: 'Planilha', 
        icon: <SvgCsv {...iconStyle} />,
        path: '/reports'
      },
    ]
  },
];

const settings = ['Meu usuário', 'Sair'];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [position, setPosition] = useState<"sticky" | "static">("static"); // Inicialização sem acessar `window`

  useEffect(() => {
    setPosition(window.innerWidth < DESKTOP_WIDTH_BREAKPOINT ? "sticky" : "static");

    const handleResize = () => {
      setPosition(window.innerWidth < DESKTOP_WIDTH_BREAKPOINT ? "sticky" : "static");
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
          <Box sx={{display: 'flex', width: 'max-content', flex: '1', justifyContent: 'center', alignItems: 'center', [`@media (max-width:${DESKTOP_WIDTH_BREAKPOINT - 1}px)`]: { flexDirection: 'row-reverse'}}}>
            {/* Logo Sensei para DESKTOP */}
            <Box sx={{
              display: "none",
              [`@media (min-width:${DESKTOP_WIDTH_BREAKPOINT}px)`]: {
                display: "flex",
                minWidth: 'fit-content'
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
                  className={`mr-4 ${window.innerWidth < DESKTOP_WIDTH_BREAKPOINT ? "hidden" : "flex"}`}
                />
              </Link>
            </Box>

            {/* Menu sanduíche para Mobile */}
            <Box sx={{ 
              flexGrow: 1, 
              display: "none",
              [`@media (max-width:${DESKTOP_WIDTH_BREAKPOINT - 1}px)`]: {
                display: "flex",
                justifyContent: 'flex-end'
              }
              }}>
              <MobileDrawer />
            </Box>

            {/* Logo Sensei para Mobile */}
            <Box sx={{ flexGrow: 1, display: "none",
              [`@media (max-width:${DESKTOP_WIDTH_BREAKPOINT - 1}px)`]: {
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
                  className={window.innerWidth < DESKTOP_WIDTH_BREAKPOINT ? "flex" : "hidden"}
                  />
              </Link>
            </Box>

            {/* Menu Items para Desktop */}
            <Box sx={{ 
              flexGrow: 1, 
              display: "none",
              [`@media (min-width:${DESKTOP_WIDTH_BREAKPOINT}px)`]: {
                display: "flex",
              },
              gap: "clamp(4px, 1.5vw, 24px)",
              justifyContent: "center",
            }}>
              {menuItems.map((item) => (
                <>
                  {item.childrens ?
                    <PopupState variant="popover" popupId={item.label} key={item.label}>
                      {(popupState) => (
                        <>
                          <Button  {...bindHover(popupState)} sx={{ textTransform: 'capitalize', my: 2, color: 'white', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
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
                      sx={{ textTransform: 'capitalize', my: 2, color: 'white'}}
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
import SvgUser from '../../../public/svg/SvgUser';
import SvgUserSearch from '../../../public/svg/SvgUserSearch';
import SvgBirthdayCake from '../../../public/svg/SvgBirthdayCake';
import SvgUserGroup from '../../../public/svg/SvgUserGroup';
import SvgChartLineData from '../../../public/svg/SvgChartLineData';
import SvgPercent from '../../../public/svg/SvgPercent';
import SvgAssessment from '../../../public/svg/SvgAssessment';
import SvgFileSearch from '../../../public/svg/SvgFileSearchOld';
import SvgNotebook from '../../../public/svg/SvgNotebook';
import SvgCsv from '../../../public/svg/SvgCsv';
import SvgAddUser from '../../../public/svg/SvgAddUser';
import SvgChecklist from '../../../public/svg/SvgChecklist';
import SvgReport from '../../../public/svg/SvgReport';
import SvgAddAssessment from '../../../public/svg/SvgAddAssessment';
import SvgVersus from '../../../public/svg/SvgVersus';

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
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
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  {
    label: 'Atletas', 
    icon: {
      path: "/header_icons/add_atletas.png",
      height: 25,
      width: 20
    },
    childrens: [
      {
        label: 'Cadastrar', 
        path: '/atleta/cadastrar',
        icon: {
          path: "/header_icons/add_atletas.png",
          height: 25,
          width: 20
        }
      },
      {
        label: 'Chamada', 
        path: '/chamada',
        icon: {
          path: "/header_icons/chamada.png",
          height: 20,
          width: 20
        }
      },
      {
        label: 'Avaliação', 
        path: '/valencia/menu',
        icon: {
          path: "/header_icons/avaliacao.png",
          height: 30,
          width: 30
        }
      },
      {
        label: 'Relatório', 
        path: '/relatorioAvaliacao',
        icon: {
          path: "/header_icons/relatorio.png",
          height: 20,
          width: 20
        }
      },
    ]
  },
  {
    label: "Comparativo",
    path: "/comparison",
    icon: {
      path: "/header_icons/versus.png",
      height: 30,
      width: 25,
    }
  },
];

const settings = ['Meu usuário', 'Sair'];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MobileDrawer />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link
              href={"/"}
            >
              <Image
                width={90}
                height={50}
                alt="Logotipo Sensei"
                src="/logo_sensei_white.png"
                className='hidden max-[900px]:flex'
                />
            </Link>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '24px', gap: '24px' }}>
            {menuItems.map((item) => (
              <>
                {item.childrens ?
                  <PopupState variant="popover" popupId={item.label}>
                    {(popupState) => (
                      <>
                        <Button  {...bindHover(popupState)} sx={{ my: 2, color: 'white', display: 'flex', gap: '6px' }}>
                          <Image
                            src={item.icon.path}
                            width={item.icon.width}
                            height={item.icon.height}
                            className="m-auto"
                            alt=''
                          />
                          <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{item.label}</Typography>
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
                          }
                        )}
                        >
                          {item.childrens.map((itemChildren) => (
                            <MenuItem onClick={popupState.close} key={itemChildren.label}>
                              <Link href={itemChildren.path} className="flex gap-3 justify-center items-center">
                                <Box sx={{width: '40px', height: '40px', display: 'flex'}}>
                                  <Image
                                    src={itemChildren.icon.path}
                                    width={itemChildren.icon.width}
                                    height={itemChildren.icon.height}
                                    className="m-auto"
                                    alt=''
                                    />
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
                    <Link href={item.path} className='flex gap-2'>
                      <Image
                        src={item.icon.path}
                        width={item.icon.width}
                        height={item.icon.height}
                        className="m-auto"
                        alt=''
                      />
                      <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{item.label}</Typography>
                    </Link>
                </Button>
                }
              </>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
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
                  <Image
                    src={menuItem.icon.path}
                    width={menuItem.icon.width}
                    height={menuItem.icon.height}
                    className="m-auto"
                    alt=''
                    />
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
                    <Image
                      src={menuItemChildren.icon.path}
                      width={menuItemChildren.icon.width}
                      height={menuItemChildren.icon.height}
                      className="m-auto"
                      alt=''
                    />
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
                <Image
                  src={menuItem.icon.path}
                  width={menuItem.icon.width}
                  height={menuItem.icon.height}
                  className="m-auto"
                  alt=''
                  />
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

      <Drawer open={open} onClose={toggleDrawer(false)} sx={(theme) => ({
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
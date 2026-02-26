import AppBar from '@mui/material/AppBar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { Link } from '@tanstack/react-router'

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
}))

export const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  gap: theme.spacing(2),
  ListItem: {
    color: theme.palette.text.primary,
  },
}))

export const StyledLogoLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.primary,
  width: 'auto',
  height: '40px',
  svg: {
    width: '100%',
    height: '100%',
  },
}))

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  marginInline: 'auto',
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
}))

export const StyleAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

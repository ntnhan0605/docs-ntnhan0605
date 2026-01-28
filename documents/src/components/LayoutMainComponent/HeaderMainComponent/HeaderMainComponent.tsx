import type { IMenuItem } from '@/types/menu'
import { MenuList } from '@mui/material'
import type { AppBarProps } from '@mui/material/AppBar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SvgIcon from '@mui/material/SvgIcon'
import { ArrowDown } from 'lucide-react'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import {
  bindHover,
  bindPopover,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { type FC } from 'react'
import { LogoDarkSvg } from '../../Icons'
import {
  StyleAppBar,
  StyledList,
  StyledListItem,
  StyledLogoLink,
  StyledToolbar,
} from './HeaderMainComponent.styled'

const CLS = 'HeaderMainComponent'

// interface HeaderMainMenuListItemProps {
//   item: IMenuItem
// }
// const HeaderMainMenuListItem: FC<HeaderMainMenuListItemProps> = ({
//   item,
//   ...restProps
// }) => {
//   const { key, label, icon: Icon, children } = item

//   const hasChildren = !!children?.length

//   return (
//     <StyledListItem key={key} {...restProps}>
//       {!!Icon && (
//         <ListItemIcon className={`${CLS}__nav-item-icon`}>
//           <SvgIcon component={Icon} />
//         </ListItemIcon>
//       )}
//       <ListItemText className={`${CLS}__nav-item-text`}>{label}</ListItemText>
//     </StyledListItem>
//   )
// }

export interface HeaderMainComponentProps extends AppBarProps {
  items?: IMenuItem[]
}
export const HeaderMainComponent: FC<HeaderMainComponentProps> = (props) => {
  const { items, ...restProps } = props

  return (
    <StyleAppBar position="static" {...restProps} className={`${CLS}`}>
      <StyledToolbar className={`${CLS}__toolbar`}>
        <StyledLogoLink
          to="/"
          className={`${CLS}__logo`}
          aria-label="Go to homepage"
        >
          <LogoDarkSvg />
        </StyledLogoLink>
        {/* Navigation items would go here */}
        <StyledList className={`${CLS}__nav`}>
          {items?.map((item) => {
            const { key, label, icon: Icon, children } = item
            const popupState = usePopupState({
              variant: 'popover',
              popupId: key,
            })
            return (
              <StyledListItem
                key={key}
                className={`${CLS}__nav-item`}
                {...bindHover(popupState)}
              >
                {!!Icon && (
                  <ListItemIcon className={`${CLS}__nav-item-icon`}>
                    <SvgIcon component={Icon} />
                  </ListItemIcon>
                )}
                <ListItemText className={`${CLS}__nav-item-text`}>
                  {label}
                </ListItemText>
                {!!children?.length && (
                  <ListItemButton>
                    <ArrowDown />
                  </ListItemButton>
                )}
                <HoverPopover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuList>
                    {children?.map((subItem) => (
                      <StyledListItem
                        key={subItem.key}
                        className={`${CLS}__nav-subitem`}
                      >
                        <ListItemText className={`${CLS}__nav-subitem-text`}>
                          {subItem.label}
                        </ListItemText>
                      </StyledListItem>
                    ))}
                  </MenuList>
                </HoverPopover>
              </StyledListItem>
            )
          })}
        </StyledList>
      </StyledToolbar>
    </StyleAppBar>
  )
}

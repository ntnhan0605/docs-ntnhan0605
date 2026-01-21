import type { IMenuItem } from '@/types/men'
import type { IMuiSvgIcon } from '@/types/routes'
import {
  default as MenuIcon,
  default as SvgIcon,
} from '@mui/icons-material/Menu'
import BottomNavigation from '@mui/material/BottomNavigation'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { styled, useTheme, type CSSProperties } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { animated, useSpring } from '@react-spring/web'
import { useLocation } from '@tanstack/react-router'
import clsx from 'clsx'
import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { TreeMenuComponent } from '../TreeMenuComponent'

const CLS = 'LayoutSidebar'

type SidebarProps = {
  bgColor?: string
  bgImage?: string
  isOpen?: boolean
  onClose?: () => void
}
const AnimatedSidebarOverlay = styled(animated.div)({
  position: 'fixed',
  inset: 0,
  zIndex: 9,
  backgroundColor: 'rgba(0,0,0,0.4)',
  transformOrigin: 'center',
})
const StyledSidebarOverlay = ({
  isOpen,
  onClose,
}: Pick<SidebarProps, 'isOpen' | 'onClose'>) => {
  const style = useSpring({
    delay: 200,
    to: {
      opacity: isOpen ? 1 : 0,
      PointerEvent: isOpen ? 'auto' : 'none',
    },
  })

  return <AnimatedSidebarOverlay style={style} onClick={onClose} />
}
const StyledSidebarPaper = styled(Paper)<SidebarProps>(
  ({ theme, bgColor, bgImage, isOpen }) => ({
    backgroundColor: bgColor,
    backgroundImage: bgImage,
    [`${theme.breakpoints.down('md')}`]: {
      position: 'fixed',
      zIndex: 10,
      insetBlock: 0,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    },
  }),
)

export type LayoutSidebarComponentProps = PropsWithChildren<{
  bg?: string
  logo?: IMuiSvgIcon
  title?: string | ReactNode
  items: IMenuItem[]
  sidebarProps?: SidebarProps
  className?: string
  style?: CSSProperties
}>
export const LayoutSidebarComponent: FC<LayoutSidebarComponentProps> = ({
  bg,
  title,
  logo,
  items,
  children,
  className,
  style,
}) => {
  const location = useLocation()
  const {
    palette: { mode },
  } = useTheme()
  const isMobile = useMediaQuery(({ breakpoints }) => breakpoints.down('md'))
  const [selectedItems, setSelectedItems] = useState<string>('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const defaultSelectedItems = useMemo(
    () => location.pathname,
    [location.pathname],
  )
  const defaultExpandedItems = useMemo(() => {
    const pathnameArr = location.pathname.split('/')
    const defaultExpanded: string[] = []
    let route = ''
    for (const path of pathnameArr) {
      if (path) {
        route += '/' + path
        defaultExpanded.push(route)
      }
    }
    return defaultExpanded
  }, [location.pathname])

  useEffect(() => {
    setExpandedItems(defaultExpandedItems)
  }, [defaultExpandedItems])

  useEffect(() => {
    setSelectedItems(defaultSelectedItems)
  }, [defaultSelectedItems])

  return (
    <main className={clsx(CLS, className)} style={style}>
      <Box className={clsx(`${CLS}--container`, 'flex')}>
        {isMobile && (
          <StyledSidebarOverlay
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
        <StyledSidebarPaper
          square
          className={clsx(
            `${CLS}--sidebar`,
            'h-dvh w-[280px] sticky top-0 left-0',
            'flex flex-col',
          )}
        >
          <Box
            className={clsx(`${CLS}--sidebar_header p-4`)}
            display="flex"
            gap={2}
          >
            {logo && (
              <SvgIcon
                component={logo}
                className={clsx(`${CLS}--sidebar_logo`, 'w-8 h-8')}
              />
            )}
            {!!title && (
              <Typography variant="h1" className="!text-2xl font-bold">
                {title}
              </Typography>
            )}
          </Box>
          <Box
            className={clsx(
              `${CLS}--sidebar_body`,
              'flex-1 min-h-0 overflow-auto',
            )}
          >
            <TreeMenuComponent
              items={items}
              selectedItems={selectedItems}
              onItemSelectionToggle={(_: any, itemId: SetStateAction<string>) =>
                setSelectedItems(itemId)
              }
              expandedItems={expandedItems}
              onExpandedItemsChange={(
                _: any,
                itemIds: SetStateAction<string[]>,
              ) => setExpandedItems(itemIds)}
            />
          </Box>
        </StyledSidebarPaper>
        <Box className={clsx(`${CLS}--body`, 'flex-1 min-w-0 p-4')}>
          {children}
        </Box>
        <BottomNavigation>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </IconButton>
        </BottomNavigation>
      </Box>
    </main>
  )
}

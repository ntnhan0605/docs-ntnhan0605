import Collapse from '@mui/material/Collapse'
import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import type { TransitionProps } from '@mui/material/transitions'
import Typography from '@mui/material/Typography'
import { useTreeItemModel } from '@mui/x-tree-view/hooks'
import {
  RichTreeView,
  type RichTreeViewProps,
} from '@mui/x-tree-view/RichTreeView'
import {
  TreeItemCheckbox,
  TreeItemContent,
  TreeItemIconContainer,
  TreeItemLabel,
  TreeItemRoot,
  type TreeItemProps,
} from '@mui/x-tree-view/TreeItem'
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay'
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon'
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider'
import {
  useTreeItem,
  type UseTreeItemParameters,
} from '@mui/x-tree-view/useTreeItem'
import { animated, useSpring } from '@react-spring/web'
import { forwardRef, Fragment, type FC } from 'react'

import type { IMenuItem } from '@/types/menu'
import { Link, type LinkProps } from '@tanstack/react-router'

export type TreeMenuComponentProps = RichTreeViewProps<IMenuItem, false>
const TreeIMenuCollapse = styled(Collapse)({
  padding: 0,
})

const TreeIMenuAnimatedCollapse = animated(TreeIMenuCollapse)

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  })

  return <TreeIMenuAnimatedCollapse style={style} {...props} />
}

const TreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontWeight: 500,
})

interface TreeIMenuItemLabelProps {
  children: React.ReactNode
  icon?: IMenuItem['icon']
  expandable?: boolean
}

function TreeMenuItemLabel({
  icon: Icon,
  expandable,
  children,
  ...other
}: TreeIMenuItemLabelProps) {
  return (
    <TreeItemLabel {...other} sx={{ display: 'flex', alignItems: 'center' }}>
      {Icon && (
        <SvgIcon
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: '1.2rem' }}
        />
      )}
      <TreeItemLabelText variant="body2">{children}</TreeItemLabelText>
      {/* {expandable && <DotIcon />} */}
    </TreeItemLabel>
  )
}

type TreeMenuItemProps = TreeItemProps

interface ITreeMenuItemProps
  extends
    Omit<UseTreeItemParameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {}
const TreeMenuItem: FC<TreeMenuItemProps> = forwardRef(function CustomTreeItem(
  props: ITreeMenuItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref })

  const {
    href,
    icon,
    description,
    children: itemChildren,
  } = useTreeItemModel<IMenuItem>(itemId)!
  const isLink = href && !itemChildren?.length
  const TreeItemContainer = isLink ? Link : Fragment
  const treeItemContainerProps = isLink ? { to: href } : {}

  const expandable = status.expandable && status.expanded

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContainer {...(treeItemContainerProps as LinkProps)}>
          <TreeItemContent {...getContentProps()}>
            <TreeItemIconContainer {...getIconContainerProps()}>
              <TreeItemIcon status={status} />
            </TreeItemIconContainer>
            <TreeItemCheckbox {...getCheckboxProps()} />
            <TreeMenuItemLabel {...getLabelProps({ icon, expandable })} />
            {!!description && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ marginLeft: 'auto' }}
              >
                {description}
              </Typography>
            )}
            <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
          </TreeItemContent>
        </TreeItemContainer>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  )
})

export const TreeMenuComponent: FC<TreeMenuComponentProps> = ({
  items,
  slots,
  ...props
}) => {
  return (
    <RichTreeView
      {...props}
      items={items}
      slots={{ ...slots, item: slots?.item || TreeMenuItem }}
    />
  )
}

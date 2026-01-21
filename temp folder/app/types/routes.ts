import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material/SvgIcon';
import type { RouteConfigEntry } from '@react-router/dev/routes';
import type { ComponentType, ReactNode, SVGProps } from 'react';

export type IMuiSvgIcon =
  | ComponentType<SVGProps<SVGSVGElement>>
  | ComponentType<HTMLSpanElement>
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string });

export interface IRouteConfigEntry extends RouteConfigEntry {
  label?: string | ReactNode;
  icon?: IMuiSvgIcon;
  children?: IRouteConfigEntry[];
}

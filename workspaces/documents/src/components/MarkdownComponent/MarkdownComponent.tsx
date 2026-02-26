import type { CSSProperties, FC, ReactNode } from 'react';

import { Marked } from 'marked';
import clsx from 'clsx';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const marked = new Marked({});

const CLS = 'MarkdownComponent';
export type MarkdownComponentProps = {
  loading?: boolean;
  children?: string | ReactNode;
  className?: string;
  style?: CSSProperties;
};
export const MarkdownComponent: FC<MarkdownComponentProps> = (props) => {
  const { loading, children, className, style } = props;

  if (loading) {
    return (
      <Stack
        rowGap={0}
        className={clsx(`${CLS}-loading`, 'min-h-[50vh] w-full')}
      >
        <Skeleton height={32} width="100%" />
        <Skeleton height={32} width="100%" />
        <Skeleton height={32} width="40%" />
      </Stack>
    );
  }

  if (!children) {
    return null;
  }

  if (typeof children === 'string') {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: marked.parseInline(children),
        }}
        className={clsx(CLS, className)}
        style={style}
      />
    );
  }

  return (
    <span className={clsx(CLS, className)} style={style}>
      {children}
    </span>
  );
};

import { useEffect, useMemo, useState } from 'react';

export function useReadMarkdown(fetchPromise: Promise<any>) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!fetchPromise) return;
    setLoading(true);
    fetchPromise
      .then((res) => {
        setContent(res.default);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return useMemo(
    () => ({ loading, setLoading, content, setContent }),
    [loading, setLoading, content, setContent]
  );
}

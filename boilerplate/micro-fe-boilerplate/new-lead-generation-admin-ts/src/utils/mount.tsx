import { createRoot } from 'react-dom/client';
import React from 'react';

/**
 * Utility function to mount a React component to a given element.
 * @param el - The DOM element to mount the component into.
 * @param Component - The React component to render.
 * @param props - Optional props to pass to the component.
 */
const mountComponent = (el: HTMLElement | null, Component: React.ComponentType<any>, props?: any) => {
  console.log('props', props);
  if (el) {
    const root = createRoot(el);
    root.render(<Component {...props} />);
  }
};

export default mountComponent;

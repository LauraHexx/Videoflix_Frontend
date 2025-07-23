import { ServerRoute, RenderMode } from '@angular/ssr';
import { routes } from './app.routes';

const prerenderPathsWithParams = new Set([
  'reset-password/:token',
  'video/:id',
  'video-detail/:id',
]);

export const serverRoutes: ServerRoute[] = routes.map((route) => {
  const path = route.path || '';

  if (prerenderPathsWithParams.has(path)) {
    if (path === 'reset-password/:token') {
      return {
        path,
        renderMode: RenderMode.Prerender,
        getPrerenderParams: async () => [
          { token: 'example-token-1' },
          { token: 'example-token-2' },
        ],
      };
    }

    if (path === 'video/:id' || path === 'video-detail/:id') {
      return {
        path,
        renderMode: RenderMode.Prerender,
        getPrerenderParams: async () => [{ id: '1' }, { id: '2' }],
      };
    }
  }

  return {
    path,
    renderMode: RenderMode.Prerender,
  };
});

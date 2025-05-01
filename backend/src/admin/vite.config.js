export default (config) => {
  return {
    ...config,
    optimizeDeps: {
      ...(config.optimizeDeps || {}),
      exclude: [...(config.optimizeDeps?.exclude || []), 'layout', 'HomePage'],
      force: true
    },
    server: {
      ...(config.server || {}),
      hmr: {
        ...(config.server?.hmr || {}),
        overlay: false
      }
    }
  };
};
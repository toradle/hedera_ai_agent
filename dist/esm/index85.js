class PluginRegistry {
  /**
   * Creates a new PluginRegistry instance
   * @param context The context to provide to plugins during initialization
   */
  constructor(context) {
    this.plugins = /* @__PURE__ */ new Map();
    this.context = context;
    this.logger = context.logger;
  }
  /**
   * Register a plugin with the registry
   * @param plugin The plugin to register
   * @throws Error if a plugin with the same ID is already registered
   */
  async registerPlugin(plugin) {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin with ID ${plugin.id} is already registered`);
    }
    await plugin.initialize(this.context);
    this.plugins.set(plugin.id, plugin);
    this.logger.info(`Plugin registered: ${plugin.name} (${plugin.id}) v${plugin.version}`);
  }
  /**
   * Get a plugin by ID
   * @param id The ID of the plugin to retrieve
   * @returns The plugin, or undefined if not found
   */
  getPlugin(id) {
    return this.plugins.get(id);
  }
  /**
   * Get all registered plugins
   * @returns Array of all registered plugins
   */
  getAllPlugins() {
    return Array.from(this.plugins.values());
  }
  /**
   * Get all tools from all registered plugins
   * @returns Array of all tools provided by registered plugins
   */
  getAllTools() {
    return this.getAllPlugins().flatMap((plugin) => plugin.getTools());
  }
  /**
   * Unregister a plugin
   * @param id The ID of the plugin to unregister
   * @returns true if the plugin was unregistered, false if it wasn't found
   */
  async unregisterPlugin(id) {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      return false;
    }
    if (plugin.cleanup) {
      try {
        await plugin.cleanup();
      } catch (error) {
        this.logger.error(`Error during plugin cleanup: ${error}`);
      }
    }
    const result = this.plugins.delete(id);
    if (result) {
      this.logger.info(`Plugin unregistered: ${plugin.name} (${plugin.id})`);
    }
    return result;
  }
  /**
   * Unregister all plugins
   */
  async unregisterAllPlugins() {
    const pluginIds = Array.from(this.plugins.keys());
    for (const id of pluginIds) {
      await this.unregisterPlugin(id);
    }
  }
}
export {
  PluginRegistry
};
//# sourceMappingURL=index85.js.map

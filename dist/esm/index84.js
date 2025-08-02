class BasePlugin {
  /**
   * Initialize the plugin with the provided context
   * @param context The context containing shared resources
   */
  async initialize(context) {
    this.context = context;
  }
  /**
   * Clean up resources when the plugin is unloaded
   * Default implementation does nothing
   */
  async cleanup() {
  }
}
export {
  BasePlugin
};
//# sourceMappingURL=index84.js.map

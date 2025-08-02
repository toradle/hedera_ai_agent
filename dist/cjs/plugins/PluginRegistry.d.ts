import { IPlugin, PluginContext, HederaTool } from './PluginInterface';
/**
 * Registry for managing plugins in the Hedera Agent Kit
 */
export declare class PluginRegistry {
    private plugins;
    private context;
    private logger;
    /**
     * Creates a new PluginRegistry instance
     * @param context The context to provide to plugins during initialization
     */
    constructor(context: PluginContext);
    /**
     * Register a plugin with the registry
     * @param plugin The plugin to register
     * @throws Error if a plugin with the same ID is already registered
     */
    registerPlugin(plugin: IPlugin): Promise<void>;
    /**
     * Get a plugin by ID
     * @param id The ID of the plugin to retrieve
     * @returns The plugin, or undefined if not found
     */
    getPlugin(id: string): IPlugin | undefined;
    /**
     * Get all registered plugins
     * @returns Array of all registered plugins
     */
    getAllPlugins(): IPlugin[];
    /**
     * Get all tools from all registered plugins
     * @returns Array of all tools provided by registered plugins
     */
    getAllTools(): HederaTool[];
    /**
     * Unregister a plugin
     * @param id The ID of the plugin to unregister
     * @returns true if the plugin was unregistered, false if it wasn't found
     */
    unregisterPlugin(id: string): Promise<boolean>;
    /**
     * Unregister all plugins
     */
    unregisterAllPlugins(): Promise<void>;
}

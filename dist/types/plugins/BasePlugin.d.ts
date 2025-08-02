import { IPlugin, BasePluginContext, HederaTool } from './PluginInterface';
/**
 * Base class for plugins to simplify implementation
 */
export declare abstract class BasePlugin<T extends BasePluginContext = BasePluginContext> implements IPlugin<T> {
    abstract id: string;
    abstract name: string;
    abstract description: string;
    abstract version: string;
    abstract author: string;
    protected context: T;
    /**
     * Initialize the plugin with the provided context
     * @param context The context containing shared resources
     */
    initialize(context: T): Promise<void>;
    /**
     * Get the tools provided by this plugin
     * @returns Array of tools provided by this plugin
     */
    abstract getTools(): HederaTool[];
    /**
     * Clean up resources when the plugin is unloaded
     * Default implementation does nothing
     */
    cleanup(): Promise<void>;
}

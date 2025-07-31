import { Context, Configuration } from './configuration';
import { Tool } from './tools';
import coreTools from './tools';
import { Plugin, PluginRegistry } from './plugin';

export class ToolDiscovery {
  private pluginRegistry = new PluginRegistry();

  constructor(plugins: Plugin[] = []) {
    plugins.forEach(plugin => this.pluginRegistry.register(plugin));
  }

  getAllTools(context: Context, configuration?: Configuration): Tool[] {
    // Get core tools
    const coreToolsList = coreTools(context);

    // Get plugin tools
    const pluginTools = this.pluginRegistry.getTools(context);

    // Merge all tools (core tools take precedence in case of name conflicts)
    const allTools = [...coreToolsList];
    const coreToolMethods = new Set(coreToolsList.map(tool => tool.method));

    // Add plugin tools that don't conflict with core tools
    pluginTools.forEach(pluginTool => {
      if (!coreToolMethods.has(pluginTool.method)) {
        allTools.push(pluginTool);
      } else {
        console.warn(
          `Plugin tool "${pluginTool.method}" conflicts with core tool. Using core tool.`,
        );
      }
    });

    // Apply tool filtering if specified in configuration
    if (configuration?.tools && configuration.tools.length > 0) {
      return allTools.filter(tool => configuration.tools!.includes(tool.method));
    }

    return allTools;
  }

  static createFromConfiguration(configuration: Configuration): ToolDiscovery {
    return new ToolDiscovery(configuration.plugins || []);
  }
}

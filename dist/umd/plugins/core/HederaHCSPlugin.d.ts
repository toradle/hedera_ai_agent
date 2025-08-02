import { BasePlugin } from '../BasePlugin';
import { GenericPluginContext, HederaTool, IPlugin } from '../PluginInterface';
export declare class HederaHCSPlugin extends BasePlugin<GenericPluginContext> implements IPlugin<GenericPluginContext> {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    private tools;
    initialize(context: GenericPluginContext): Promise<void>;
    getTools(): HederaTool[];
}
export default HederaHCSPlugin;

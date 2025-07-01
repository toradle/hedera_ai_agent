import HederaHTSPlugin from './HederaHTSPlugin';
import HederaHCSPlugin from './HederaHCSPlugin';
import HederaAccountPlugin from './HederaAccountPlugin';
import HederaSCSPlugin from './HederaSCSPlugin';
import HederaNetworkPlugin from './HederaNetworkPlugin';

export function getAllHederaCorePlugins() {
  return [
    new HederaHTSPlugin(),
    new HederaHCSPlugin(),
    new HederaAccountPlugin(),
    new HederaSCSPlugin(),
    new HederaNetworkPlugin(),
  ];
}

export {
  HederaHTSPlugin,
  HederaHCSPlugin,
  HederaAccountPlugin,
  HederaSCSPlugin,
  HederaNetworkPlugin,
}; 
import { Route } from '../models/route.model';

export const ROUTES: Route[] = [
  {
    uuid: '1',
    address: '0.0.0.0',
    mask: '0',
    gateway: '192.168.1.1',
    interface: 'Ethernet0',
  },
  {
    uuid: '2',
    address: '10.0.0.0',
    mask: '8',
    gateway: '0.0.0.0',
    interface: 'Guest Network',
  },
  {
    uuid: '3',
    address: '192.168.1.0',
    mask: '24',
    gateway: '0.0.0.0',
    interface: 'Home Network',
  },
  {
    uuid: '4',
    address: '172.16.0.0',
    mask: '12',
    gateway: '192.168.1.1',
    interface: 'Ethernet0',
  },
  {
    uuid: '5',
    address: '192.168.100.0',
    mask: '24',
    gateway: '192.168.100.1',
    interface: 'Corporate VPN',
  },
  {
    uuid: '6',
    address: '10.10.10.0',
    mask: '24',
    gateway: '10.10.10.1',
    interface: 'Wireless',
  },
  {
    uuid: '7',
    address: '172.30.0.0',
    mask: '16',
    gateway: '172.30.0.1',
    interface: 'Mobile Hotspot',
  },
  {
    uuid: '8',
    address: '192.168.0.0',
    mask: '16',
    gateway: '192.168.0.1',
    interface: 'Home Network',
  },
];
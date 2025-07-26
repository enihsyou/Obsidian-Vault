

[Avahi Tutorial: Configuring a Reflector (aka, mDNS repeater) | LinksysInfo.org](https://www.linksysinfo.org/index.php?threads/avahi-tutorial-configuring-a-reflector-aka-mdns-repeater.75706/)

[Custom config files · RMerl/asuswrt-merlin.ng Wiki](https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files)

[Troubleshooting — python-miio documentation](https://python-miio.readthedocs.io/en/latest/troubleshooting.html#id1)

```
pc_delete "deny-interfaces" "$CONFIG"
pc_delete "use-ipv6" "$CONFIG"

cat <<EOF >> "$CONFIG"
[reflector]
enable-reflector=yes
EOF

```

```
iptables -t nat -A POSTROUTING -o br0 -p udp --dport 54321 -s 192.168.1.0/24 -j MASQUERADE

--comment "homebridge-miio"
```

```shellsession
# tcpdump -i eth0 -v host 192.168.9.52 -n  
23:00:04.717882 IP (tos 0x0, ttl 64, id 42497, offset 0, flags [DF], proto UDP (17), length 60)  
192.168.1.28.43357 > 192.168.9.52.54321: UDP, length 32  
23:00:04.783514 IP (tos 0x0, ttl 63, id 4410, offset 0, flags [none], proto UDP (17), length 60)  
192.168.9.52.54321 > 192.168.1.28.43357: UDP, length 32  

# tcpdump -i br0 -v host 192.168.9.52 -n  
23:00:13.919653 IP (tos 0x0, ttl 63, id 43197, offset 0, flags [DF], proto UDP (17), length 60)  
192.168.9.1.35328 > 192.168.9.52.54321: UDP, length 32  
23:00:14.012635 IP (tos 0x0, ttl 64, id 4413, offset 0, flags [none], proto UDP (17), length 60)  
192.168.9.52.54321 > 192.168.9.1.35328: UDP, length 32
```

```shell-session
# iptables -t nat -L  
Chain PREROUTING (policy ACCEPT)  
target prot opt source destination  
RETURN all -- anywhere anywhere  
RETURN all -- anywhere anywhere  
REDIRECT udp -- anywhere anywhere udp dpt:domain redir ports 53  
GAME_VSERVER all -- anywhere 192.168.1.20  
VSERVER all -- anywhere 192.168.1.20  
  
Chain INPUT (policy ACCEPT)  
target prot opt source destination  
  
Chain OUTPUT (policy ACCEPT)  
target prot opt source destination  
  
Chain POSTROUTING (policy ACCEPT)  
target prot opt source destination  
MASQUERADE all -- !192.168.1.20 anywhere mode: fullcone  
MASQUERADE all -- 192.168.9.0/24 192.168.9.0/24  
MASQUERADE udp -- 192.168.1.0/24 anywhere udp dpt:54321
```

```
forceMiCloudConnection=true
```

```javascript
const dgram = require('dgram');

const socket = dgram.createSocket('udp4');

const message = Buffer.from('21310020ffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 'hex');
const host = '192.168.9.52';
const port = 54321;

socket.on('message', (msg, rinfo) => {
  console.log(`接收到服务器 ${rinfo.address}:${rinfo.port} 的响应: ${msg.toString('hex')}`);
  socket.close();
});

socket.send(message, 0, message.length, port, host, (err) => {
  if (err) {
    console.error('发送失败:', err);
  } else {
    console.log(`已发送消息到 ${host}:${port}: ${message.toString('hex')}`);
  }
});
```

```shell-session
homebridge@enihsyou-NAS:/volume1/homebridge $ node test.js 
已发送消息到 192.168.9.52:54321
接收到服务器 192.168.9.52:54321 的响应: 213100200000000030fe8d55000064a9ffffffffffffffffffffffffffffffff
```

---
最终方案

```
# avahi-daemon.postconf
#!/bin/sh
# code: language=bash
CONFIG=$1

# shellcheck source=/dev/null
. /koolshare/bin/helper.sh

pc_delete "deny-interfaces" "$CONFIG"

cat <<EOF >> "$CONFIG"
[reflector]
enable-reflector=yes
EOF
```

```
#!/bin/sh
# please link me, I will run when nat-start event occur.
# ln -s /jffs/.koolshare/enihsyou/N200enihsyou.sh /jffs/.koolshare/init.d/

# link avahi-daemon.postconf
if [ ! -e /jffs/scripts/avahi-daemon.postconf ]; then
  if [ -f /jffs/.koolshare/enihsyou/avahi-daemon.postconf ]; then
    logme "link /jffs/scripts/avahi-daemon.postconf"
    ln -sf /jffs/.koolshare/enihsyou/avahi-daemon.postconf /jffs/scripts/avahi-daemon.postconf
  else
    logme "avahi-daemon.postconf not found, please check"
  fi
fi

# append homebridge-miio iptables rules
if ! iptables -t nat -C POSTROUTING -o br0 -p udp --dport 54321 -s 192.168.1.0/24 -j MASQUERADE > /dev/null 2>&1; then
  logme "append homebridge-miio iptables rules"
  iptables -t nat -A POSTROUTING -o br0 -p udp --dport 54321 -s 192.168.1.0/24 -j MASQUERADE
fi
```
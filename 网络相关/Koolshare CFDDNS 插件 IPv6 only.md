---
创建时间: 2025-07-25T16:37:25+08:00
---

[rogsoft/cfddns/cfddns/scripts/cfddns_config.sh at master · koolshare/rogsoft](https://github.com/koolshare/rogsoft/blob/master/cfddns/cfddns/scripts/cfddns_config.sh)

```diff
diff --git cfddns_config.orig.sh cfddns_config.sh
index 7cd4ef0..3c2c027 100644
--- cfddns_config.orig.sh
+++ cfddns_config.sh
@@ -49,7 +49,7 @@ get_info(){
 		# CFDDNS的RECORD ID
 		cfddns_id=`echo $cfddns_result | awk -F"","" '{print $1}' | sed 's/{.*://g' | sed 's/\"//g'`
 		# CFDDNS的RECORD IP
-		record_ip=`echo $cfddns_result | awk -F"","" '{print $6}' | sed -e 's/\"//g' -e 's/content://'`
+		record_ip=`echo $cfddns_result | awk -F"","" '{print $4}' | sed -e 's/\"//g' -e 's/content://'`
 		echo_date CloudFlare IP${ip_type}为 $record_ip
 	else
 		dbus set cfddns_status_${ip_type}="【$LOGTIME】：获取IP${ip_type}解析记录错误！"
@@ -114,7 +114,9 @@ start)
 		
 		echo_date "======================================" >> $LOG_FILE
 		echo_date "检测到网络拨号..." >> $LOG_FILE
-		check_update 4 >> $LOG_FILE
+		if [ "$cfddns_ipv4" == "1" ];then
+			check_update 4 >> $LOG_FILE
+		fi
 		if [ "$cfddns_ipv6" == "1" ];then
 			check_update 6 >> $LOG_FILE
 		fi
@@ -123,7 +125,8 @@ start)
 	fi
 	;;
 update)
-	check_update >> $LOG_FILE
+	check_update 4 >> $LOG_FILE
+	check_update 6 >> $LOG_FILE
 	;;
 esac
 # ====================================submit by web====================================
@@ -135,7 +138,9 @@ case $2 in
 	if [ "$cfddns_enable" == "1" ];then
 		[ ! -L "/koolshare/init.d/S99cfddns.sh" ] && ln -sf /koolshare/scripts/cfddns_config.sh /koolshare/init.d/S99cfddns.sh
 		echo_date "======================================" >> $LOG_FILE
-		check_update 4 >> $LOG_FILE
+		if [ "$cfddns_ipv4" == "1" ];then
+			check_update 4 >> $LOG_FILE
+		fi
 		if [ "$cfddns_ipv6" == "1" ];then
 			check_update 6 >> $LOG_FILE
 		fi
```
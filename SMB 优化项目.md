
```shellsession
$ Get-SmbClientConfiguration  
  
AuditInsecureGuestLogon : False  
AuditServerDoesNotSupportEncryption : False  
AuditServerDoesNotSupportSigning : False  
BlockNTLM : False  
BlockNTLMServerExceptionList :  
CompressibilitySamplingSize : 524288000  
CompressibleThreshold : 104857600  
ConnectionCountPerRssNetworkInterface : 4  
DirectoryCacheEntriesMax : 16  
DirectoryCacheEntrySizeMax : 65536  
DirectoryCacheLifetime : 10  
DisableCompression : False  
DisabledSMBQUICServerExceptionList :  
DormantFileLimit : 1023  
EnableBandwidthThrottling : True  
EnableByteRangeLockingOnReadOnlyFiles : True  
EnableCompressibilitySampling : False  
EnableInsecureGuestLogons : False  
EnableLargeMtu : True  
EnableLoadBalanceScaleOut : True  
EnableMailslots : False  
EnableMultiChannel : True  
EnableSecuritySignature : True  
EnableSMBQUIC : True  
EncryptionCiphers : AES_128_GCM, AES_128_CCM, AES_256_GCM, AES_256_CCM  
ExtendedSessionTimeout : 1000  
FileInfoCacheEntriesMax : 64  
FileInfoCacheLifetime : 10  
FileNotFoundCacheEntriesMax : 128  
FileNotFoundCacheLifetime : 5  
ForceSMBEncryptionOverQuic : False  
InvalidAuthenticationCacheLifetime : 30  
KeepConn : 600  
MaxCmds : 50  
MaximumConnectionCountPerServer : 32  
OplocksDisabled : False  
RequestCompression : False  
RequireEncryption : False  
RequireSecuritySignature : True  
SessionTimeout : 60  
SkipCertificateCheck : False  
Smb2DialectMax : None  
Smb2DialectMin : None  
UseOpportunisticLocking : True  
WindowSizeThreshold : 8
```


```powershell
Set-SmbClientConfiguration -EnableBandwidthThrottling $false
Set-SmbClientConfiguration -RequireSecuritySignature $false
```
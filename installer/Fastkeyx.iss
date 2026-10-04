; Fastkeyx Windows Installer
#define MyAppName "Fastkeyx"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Fastkeyx"
#define MyAppExeName "Fastkeyx.exe"

[Setup]
AppId={{A8F7E5D4-91B4-4E7A-9A2E-5A5B10001001}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={localappdata}\Fastkeyx
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=..\public
OutputBaseFilename=Fastkeyx-Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\{#MyAppExeName}
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "..\public\Fastkeyx.exe"; DestDir: "{app}"; Flags: ignoreversion

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"

[Icons]
Name: "{userdesktop}\Fastkeyx"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userprograms}\Fastkeyx\Fastkeyx"; Filename: "{app}\{#MyAppExeName}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch Fastkeyx"; Flags: nowait postinstall skipifsilent

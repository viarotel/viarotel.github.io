$Name = "Windows Virtual Monitor V1.0"
$ZipUrl = "https://amyuni.com/downloads/usbmmidd_v2.zip"
$WorkDir = "$env:ProgramData\windows-virtual-monitor"
$DriverDir = "$WorkDir\usbmmidd_v2"
$DriverName = "usbmmidd"
$ConfigFile = "$WorkDir\config.json"
$TaskName = "readd-virtual-monitors"

$ProcessorArchitecture = (Get-WmiObject Win32_Processor).AddressWidth
$Installer = "deviceinstaller"
if ($ProcessorArchitecture -eq 64) { $Installer = "deviceinstaller64" }

function Get-Config {
    if (-not (Test-Path $ConfigFile)) {
        $Config = @{ "Monitors" = 0 } | ConvertTo-Json 
        $Config | Out-File -FilePath $ConfigFile -Encoding utf8 -Force
    }

    $Config = Get-Content -Path $ConfigFile | ConvertFrom-Json
    return $Config
}

function Set-Config {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Setting,
        [Parameter(Mandatory = $true)]
        [object]$Value
    )
    $Config = Get-Config -Path $ConfigFile

    $Config.$Setting = $Value

    $Json = $Config | ConvertTo-Json
    $Json | Set-Content -Path $ConfigFile
}

function Test-IsVirtualMonitorDriverInstalled {
    return [bool](Get-PnpDevice -FriendlyName 'USB Mobile Monitor Virtual Display' -ErrorAction SilentlyContinue)
}

function Install-VirtualMonitorDriver {
    if (-not (Test-Path $WorkDir)) { 
        New-Item -ItemType Directory -Path $WorkDir | Out-Null
    }

    if (-not (Test-Path $DriverDir)) { 
        $ZipFile = "$DriverDir.zip"
        Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipFile
        Expand-Archive -Path $ZipFile -DestinationPath $WorkDir
        Remove-Item $ZipFile
    }

    if (Test-IsVirtualMonitorDriverInstalled) { 
        cmd /c "$DriverDir\$Installer stop $DriverName"
        cmd /c "$DriverDir\$Installer remove $DriverName"
    }

    cmd /c "$DriverDir\$Installer install $DriverDir\usbmmidd.inf $DriverName" 
}

function Uninstall-VirtualMonitorDriver {
    Disable-ReaddVirtualMonitors
    cmd /c "$DriverDir\$Installer stop $DriverName"
    cmd /c "$DriverDir\$Installer remove $DriverName"
    if (Test-Path $WorkDir) { Remove-Item -Recurse -Force $WorkDir }
}

function Add-VirtualMonitor {
    cmd /c "$DriverDir\$Installer enableidd 1"

    $Config = Get-Config
    $Config.Monitors ++ 
    Set-Config -Setting "Monitors" $Config.Monitors
}

function Remove-VirtualMonitor {
    cmd /c "$DriverDir\$Installer enableidd 0"

    $Config = Get-Config
    $Config.Monitors --
    Set-Config -Setting "Monitors" $Config.Monitors
}

function Test-IsAutoReaddEnabled {
    return [bool](Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue)
}

function Enable-ReaddVirtualMonitors {
    # Create PowerShell script to add virtual monitors at login
    $ScriptPath = "$WorkDir\readd-virtual-monitors.ps1"
    $Script = @"
    `$Config = Get-Content -Path $ConfigFile | ConvertFrom-Json
    for (`$i = 1; `$i -le `$Config.Monitors; `$i++) {
        cmd /c "$DriverDir\$Installer enableidd 1"
    }
"@
    $Script | Out-File -FilePath $ScriptPath -Encoding utf8 -Force
    # Create task to execute the script at startup with elevated privileges
    $Action = New-ScheduledTaskAction -Execute "powershell" -Argument "-ExecutionPolicy Bypass -File `"$ScriptPath`""
    $Trigger = New-ScheduledTaskTrigger -AtStartup
    $Principal = New-ScheduledTaskPrincipal -UserID "NT AUTHORITY\SYSTEM" -RunLevel Highest -LogonType ServiceAccount
    $Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Principal $Principal
    Register-ScheduledTask -TaskName $TaskName -InputObject $Task | Out-Null
}

function Disable-ReaddVirtualMonitors {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    $ScriptPath = "$WorkDir\readd-virtual-monitors.ps1"
    if (Test-Path $ScriptPath) { Remove-Item $ScriptPath }
}

function Show-Header {
    Clear-Host
    Write-Output "$Name`n"
    Write-Output "Reviser by viarotel"
    Write-Output "Fork: https://github.com/ThatRex/windows-virtual-monitor"
    Write-Output "Core: https://www.amyuni.com/forum/viewtopic.php?t=3030`n"
}

function Show-Menu {

    do {
        Show-Header

        if (-not (Test-IsVirtualMonitorDriverInstalled) -or -not (Test-Path $DriverDir)) { 
            Write-Output "Choose an option:`n"
            Write-Output "1. Download & Install Driver" 
            Write-Output "`n0. Exit`n"

            $Choice = Read-Host
            Show-Header

            switch ($Choice) {
                1 { 
                    Write-Output "Downloading & Installing Driver."
                    Install-VirtualMonitorDriver 
                }
                default { exit }
            }
        }
        else {
            $Config = Get-Config
            $Monitors = $Config.Monitors

            Write-Output "Virtual Monitors: $Monitors/4`n" 
            Write-Output "Choose an option:`n"
            Write-Output "1. Add Virtual Monitor"
            Write-Output "2. Remove Virtual Monitor"
            # 在系统启动时重新添加虚拟监视器启用自动重新添加/禁用
            if (Test-IsAutoReaddEnabled) { Write-Output "3. Disable Auto Re-add" }
            else { Write-Output "3. Enable Auto Re-add (Re-adds virtual monitors on startup)" }
            Write-Output "`n9. Uninstall Driver"
            Write-Output "`n0. Exit`n"

            $Choice = Read-Host
            Show-Header

            switch ($Choice) {
                1 { 
                    if ($Monitors -lt 4) { 
                        Write-Output "Adding Virtual Monitor."
                        Add-VirtualMonitor 
                    } 
                    else { 
                        Write-Output "Virtual Monitor Limit Reached." 
                    }
                }
                2 { 
                    if ($Monitors -gt 0) { 
                        Write-Output "Removing Virtual Monitor."
                        Remove-VirtualMonitor 
                    } 
                    else { 
                        Write-Output "No Virtual Monitors." 
                    }
                }
                3 { 
                    if (Test-IsAutoReaddEnabled) { 
                        Write-Output "Disabling Auto Re-add." 
                        Disable-ReaddVirtualMonitors 
                    }
                    else { 
                        Write-Output "Enabling Auto Re-add."
                        Enable-ReaddVirtualMonitors
                    }
                }
                9 { 
                    Write-Output "Uninstalling Driver."
                    Uninstall-VirtualMonitorDriver 
                }
                default { exit }
            }
        }

        Write-Output "`nDone."
        Pause
    } while ($true)
}

function Test-AdminRights {
    # Checks if self running with admin privileges; relaunches self with admin privileges if not
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Start-Process powershell "-ExecutionPolicy Bypass -File $PSCommandPath" -Verb RunAs
        exit
    }
}

$host.UI.RawUI.WindowTitle = $Name

Test-AdminRights
Show-Menu